use std::collections::HashMap;

/// CSS rule generation output
pub struct CssRule {
    pub selector: String,
    pub properties: Vec<(String, String)>,
    pub at_rule: Option<String>, // e.g. "@media (min-width: 768px)"
    pub pseudo: Option<String>,  // e.g. ":hover"
}

/// Generate CSS rule from a MegonCSS class name
pub fn class_to_css(class: &str) -> Option<CssRule> {
    // Handle variants first
    if let Some((prefix, rest)) = split_variant(class) {
        let mut rule = class_to_css(rest)?;
        rule.at_rule = variant_to_at_rule(prefix);
        return Some(rule);
    }

    // Handle state variants
    if let Some((state, rest)) = split_state(class) {
        let mut rule = class_to_css(rest)?;
        rule.pseudo = state_to_pseudo(state);
        return Some(rule);
    }

    // Handle dark mode
    if let Some(rest) = class.strip_prefix("dark:") {
        let mut rule = class_to_css(rest)?;
        rule.at_rule = Some(".dark".to_string());
        return Some(rule);
    }

    // Spacing
    if let Some(val) = class.strip_prefix("pad-") {
        return spacing_rule("padding", val);
    }
    if let Some(val) = class.strip_prefix("pad-x-") {
        return spacing_rule_x("padding", val);
    }
    if let Some(val) = class.strip_prefix("pad-y-") {
        return spacing_rule_y("padding", val);
    }
    for dir in &["t", "b", "l", "r"] {
        if let Some(val) = class.strip_prefix(&format!("pad-{}-", dir)) {
            let prop = match *dir {
                "t" => "padding-top",
                "b" => "padding-bottom",
                "l" => "padding-left",
                "r" => "padding-right",
                _ => unreachable!(),
            };
            return Some(CssRule {
                selector: format!(".{}", class),
                properties: vec![(prop.to_string(), format!("{}px", val))],
                at_rule: None,
                pseudo: None,
            });
        }
    }
    if let Some(val) = class.strip_prefix("mar-") {
        if val == "x-auto" {
            return Some(CssRule {
                selector: format!(".{}", class),
                properties: vec![
                    ("margin-left".to_string(), "auto".to_string()),
                    ("margin-right".to_string(), "auto".to_string()),
                ],
                at_rule: None,
                pseudo: None,
            });
        }
        return spacing_rule("margin", val);
    }
    for dir in &["t", "b", "l", "r"] {
        if let Some(val) = class.strip_prefix(&format!("mar-{}-", dir)) {
            let prop = match *dir {
                "t" => "margin-top",
                "b" => "margin-bottom",
                "l" => "margin-left",
                "r" => "margin-right",
                _ => unreachable!(),
            };
            return Some(CssRule {
                selector: format!(".{}", class),
                properties: vec![(prop.to_string(), format!("{}px", val))],
                at_rule: None,
                pseudo: None,
            });
        }
    }
    if let Some(val) = class.strip_prefix("gap-") {
        return spacing_rule("gap", val);
    }

    // Typography
    if let Some(val) = class.strip_prefix("fs-") {
        return Some(CssRule {
            selector: format!(".{}", class),
            properties: vec![("font-size".to_string(), format!("{}px", val))],
            at_rule: None,
            pseudo: None,
        });
    }
    if let Some(val) = class.strip_prefix("fw-") {
        return Some(CssRule {
            selector: format!(".{}", class),
            properties: vec![("font-weight".to_string(), val.to_string())],
            at_rule: None,
            pseudo: None,
        });
    }

    // Colors — only match known color names
    if let Some(color) = class.strip_prefix("bg-") {
        if let Some(val) = resolve_color(color) {
            return Some(CssRule {
                selector: format!(".{}", class),
                properties: vec![("background-color".to_string(), val)],
                at_rule: None,
                pseudo: None,
            });
        }
    }
    if let Some(color) = class.strip_prefix("text-") {
        if let Some(val) = resolve_color(color) {
            return Some(CssRule {
                selector: format!(".{}", class),
                properties: vec![("color".to_string(), val)],
                at_rule: None,
                pseudo: None,
            });
        }
    }

    // Effects
    if class == "round-full" {
        return Some(CssRule {
            selector: ".round-full".to_string(),
            properties: vec![("border-radius".to_string(), "9999px".to_string())],
            at_rule: None,
            pseudo: None,
        });
    }
    if let Some(val) = class.strip_prefix("round-") {
        return Some(CssRule {
            selector: format!(".{}", class),
            properties: vec![("border-radius".to_string(), format!("{}px", val))],
            at_rule: None,
            pseudo: None,
        });
    }

    None
}

fn spacing_rule(prop: &str, val: &str) -> Option<CssRule> {
    let v: u32 = val.parse().ok()?;
    let class_name = if prop == "padding" {
        format!("pad-{}", val)
    } else {
        format!("mar-{}", val)
    };
    Some(CssRule {
        selector: format!(".{}", class_name),
        properties: vec![(prop.to_string(), format!("{}px", v))],
        at_rule: None,
        pseudo: None,
    })
}

fn spacing_rule_x(prop: &str, val: &str) -> Option<CssRule> {
    let v: u32 = val.parse().ok()?;
    let class_name = if prop == "padding" {
        format!("pad-x-{}", val)
    } else {
        format!("mar-x-{}", val)
    };
    let l = format!("{}-left", prop);
    let r = format!("{}-right", prop);
    Some(CssRule {
        selector: format!(".{}", class_name),
        properties: vec![(l, format!("{}px", v)), (r, format!("{}px", v))],
        at_rule: None,
        pseudo: None,
    })
}

fn spacing_rule_y(prop: &str, val: &str) -> Option<CssRule> {
    let v: u32 = val.parse().ok()?;
    let class_name = if prop == "padding" {
        format!("pad-y-{}", val)
    } else {
        format!("mar-y-{}", val)
    };
    Some(CssRule {
        selector: format!(".{}", class_name),
        properties: vec![
            (format!("{}-top", prop), format!("{}px", v)),
            (format!("{}-bottom", prop), format!("{}px", v)),
        ],
        at_rule: None,
        pseudo: None,
    })
}

fn resolve_color(color: &str) -> Option<String> {
    let colors: HashMap<&str, &str> = [
        ("white", "#ffffff"),
        ("black", "#000000"),
        ("blue", "#3b82f6"),
        ("blue-dark", "#1d4ed8"),
        ("blue-light", "#dbeafe"),
        ("blue-500", "#3b82f6"),
        ("blue-600", "#2563eb"),
        ("blue-700", "#1d4ed8"),
        ("red", "#ef4444"),
        ("red-dark", "#dc2626"),
        ("red-light", "#fee2e2"),
        ("green", "#10b981"),
        ("green-dark", "#059669"),
        ("green-light", "#d1fae5"),
        ("yellow", "#eab308"),
        ("purple", "#8b5cf6"),
        ("gray", "#6b7280"),
        ("gray-light", "#f3f4f6"),
        ("gray-dark", "#374151"),
        ("gray-100", "#f3f4f6"),
        ("gray-200", "#e5e7eb"),
        ("gray-300", "#d1d5db"),
        ("gray-400", "#9ca3af"),
        ("gray-500", "#6b7280"),
        ("gray-600", "#4b5563"),
        ("gray-700", "#374151"),
        ("gray-800", "#1f2937"),
        ("gray-900", "#111827"),
    ]
    .iter()
    .cloned()
    .collect();

    colors.get(color).map(|v| v.to_string())
}

fn split_variant(class: &str) -> Option<(&str, &str)> {
    let variants = ["xl:", "lg:", "md:", "sm:"];
    for v in &variants {
        if let Some(rest) = class.strip_prefix(v) {
            return Some((*v, rest));
        }
    }
    None
}

fn split_state(class: &str) -> Option<(&str, &str)> {
    let states = ["hover:", "focus:", "active:", "disabled:"];
    for s in &states {
        if let Some(rest) = class.strip_prefix(s) {
            return Some((*s, rest));
        }
    }
    None
}

fn variant_to_at_rule(variant: &str) -> Option<String> {
    match variant {
        "sm:" => Some("@media (min-width: 640px)".to_string()),
        "md:" => Some("@media (min-width: 768px)".to_string()),
        "lg:" => Some("@media (min-width: 1024px)".to_string()),
        "xl:" => Some("@media (min-width: 1280px)".to_string()),
        _ => None,
    }
}

fn state_to_pseudo(state: &str) -> Option<String> {
    match state {
        "hover:" => Some(":hover".to_string()),
        "focus:" => Some(":focus".to_string()),
        "active:" => Some(":active".to_string()),
        "disabled:" => Some(":disabled".to_string()),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_class_to_css_padding() {
        let rule = class_to_css("pad-16").unwrap();
        assert_eq!(
            rule.properties[0],
            ("padding".to_string(), "16px".to_string())
        );
    }

    #[test]
    fn test_class_to_css_font_size() {
        let rule = class_to_css("fs-18").unwrap();
        assert_eq!(
            rule.properties[0],
            ("font-size".to_string(), "18px".to_string())
        );
    }

    #[test]
    fn test_class_to_css_variant() {
        let rule = class_to_css("md:pad-16").unwrap();
        assert!(rule.at_rule.is_some());
        assert_eq!(
            rule.properties[0],
            ("padding".to_string(), "16px".to_string())
        );
    }

    #[test]
    fn test_class_to_css_hover() {
        let rule = class_to_css("hover:bg-blue-dark").unwrap();
        assert_eq!(rule.pseudo, Some(":hover".to_string()));
    }

    #[test]
    fn test_unknown_class() {
        assert!(class_to_css("p-4").is_none());
        assert!(class_to_css("text-lg").is_none());
    }
}
