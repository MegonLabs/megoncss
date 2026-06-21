use regex::Regex;
use std::collections::HashSet;

/// Scan HTML content and extract MegonCSS class names
pub fn scan_classes(html: &str) -> Vec<String> {
    let class_re = Regex::new(r#"class="([^"]*)""#).unwrap();
    let mut classes = HashSet::new();

    for cap in class_re.captures_iter(html) {
        let class_str = &cap[1];
        for class in class_str.split_whitespace() {
            if is_megon_class(class) {
                classes.insert(class.to_string());
            }
        }
    }

    let mut result: Vec<String> = classes.into_iter().collect();
    result.sort();
    result
}

/// Known MegonCSS color names
const VALID_COLORS: &[&str] = &[
    "white",
    "black",
    "blue",
    "blue-dark",
    "blue-light",
    "blue-100",
    "blue-200",
    "blue-300",
    "blue-400",
    "blue-500",
    "blue-600",
    "blue-700",
    "blue-800",
    "blue-900",
    "red",
    "red-dark",
    "red-light",
    "red-100",
    "red-500",
    "red-600",
    "red-700",
    "green",
    "green-dark",
    "green-light",
    "green-100",
    "green-500",
    "green-600",
    "green-700",
    "yellow",
    "yellow-light",
    "yellow-100",
    "yellow-500",
    "purple",
    "purple-light",
    "purple-500",
    "gray",
    "gray-light",
    "gray-dark",
    "gray-100",
    "gray-200",
    "gray-300",
    "gray-400",
    "gray-500",
    "gray-600",
    "gray-700",
    "gray-800",
    "gray-900",
    "primary",
    "secondary",
    "muted",
];

/// Check if a class name matches MegonCSS patterns
fn is_megon_class(class: &str) -> bool {
    // Spacing: pad-*, mar-*, gap-*
    // Typography: fs-*, fw-*, ta-*, tt-*, lh-*
    // Layout: flex, grid, hide, show, w-*, h-*, items-*, justify-*
    // Colors: bg-*, text-*, border-* (only valid color names)
    // Effects: round-*, shadow, opacity-*
    // Variants: md:*, lg:*, hover:*, focus:*, dark:*

    let patterns = [
        r"^pad-\d+$",
        r"^pad-[xytblr]-\d+$",
        r"^mar-\d+$",
        r"^mar-[xytblr]-\d+$",
        r"^mar-x-auto$",
        r"^gap-\d+$",
        r"^fs-\d+$",
        r"^fw-\d+$",
        r"^ta-(left|center|right|justify)$",
        r"^tt-(uppercase|lowercase|capitalize)$",
        r"^lh-(none|tight|normal|relaxed)$",
        r"^flex$",
        r"^flex-(col|row|wrap|nowrap|\d+|auto|none)$",
        r"^grid$",
        r"^grid-(cols-\d+|rows-\d+|\d+)$",
        r"^(col|row)-span-(\d+|full)$",
        r"^hide$",
        r"^show$",
        r"^inline(-block)?$",
        r"^w-(full|screen|auto|\d+|50|33|25)$",
        r"^max-w-(full|screen|container)$",
        r"^h-(full|screen|auto)$",
        r"^min-h-(screen|full)$",
        r"^items-(center|start|end|baseline|stretch)$",
        r"^justify-(center|between|around|end|start)$",
        r"^self-(center|start|end|stretch)$",
        r"^round-\d+$",
        r"^round-full$",
        r"^shadow$",
        r"^shadow-(sm|md|lg|none)$",
        r"^opacity-(\d+|100)$",
        r"^btn$",
        r"^btn-(primary|secondary|outline|ghost|danger|sm|md|lg|icon|loading)$",
        r"^(sm|md|lg|xl):.+$",
        r"^(hover|focus|active|disabled):.+$",
        r"^dark:.*",
        r"^transition$",
        r"^transition-slow$",
        r"^scale-(95|100|105)$",
        r"^cursor-(pointer|default|not-allowed|wait|text)$",
        r"^overflow(-[x|y])?-(hidden|auto|scroll|visible)$",
        r"^pointer-events-(none|auto)$",
        r"^select-(none|all)$",
        r"^(visible|invisible)$",
        r"^relative$",
        r"^absolute$",
        r"^fixed$",
        r"^sticky$",
        r"^z-(0|10|20|30|40|50|auto)$",
        r"^truncate$",
        r"^sr-only$",
        r"^(border|border-0|border-2|border-b|border-t|border-l|border-r|border-b-0)$",
        r"^ta-(left|center|right|justify)$",
        r"^(td-none|td-underline|td-line-through)$",
        r"^(wb-normal|wb-break-all|wb-keep-all)$",
        r"^(ws-normal|ws-nowrap|ws-pre)$",
        r"^font-(sans|mono)$",
        r"^(badge|badge-blue|badge-red|badge-green)$",
        r"^(alert|alert-error|alert-success)$",
        r"^(modal-overlay|modal-content|modal-header|modal-body|modal-footer|modal-close|modal-title)$",
        r"^(toast|toast-container|toast-content|toast-title|toast-desc|toast-close|toast-removing)$",
        r"^(field-group|label|input|input-error|field-error-msg|field-desc|checkbox|radio)$",
        r"^(megon-table|megon-table-striped|megon-table-hover)$",
    ];

    // For bg-*, text-*, border-* — validate color name
    for prefix in &["bg-", "text-", "border-"] {
        if let Some(color) = class.strip_prefix(prefix) {
            return VALID_COLORS.contains(&color);
        }
    }

    patterns
        .iter()
        .any(|p| Regex::new(p).map(|re| re.is_match(class)).unwrap_or(false))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_scan_classes() {
        let html = r#"<div class="pad-16 bg-blue fs-18 fw-600 round-8">
                        <p class="text-gray fs-14">Hello</p>
                      </div>"#;
        let classes = scan_classes(html);
        assert!(classes.contains(&"pad-16".to_string()));
        assert!(classes.contains(&"bg-blue".to_string()));
        assert!(classes.contains(&"fs-18".to_string()));
        assert!(classes.contains(&"text-gray".to_string()));
        assert_eq!(classes.len(), 7);
    }

    #[test]
    fn test_is_megon_class() {
        assert!(is_megon_class("pad-16"));
        assert!(is_megon_class("pad-x-24"));
        assert!(is_megon_class("mar-8"));
        assert!(is_megon_class("mar-x-auto"));
        assert!(is_megon_class("fs-18"));
        assert!(is_megon_class("fw-700"));
        assert!(is_megon_class("bg-blue"));
        assert!(is_megon_class("bg-blue-500"));
        assert!(is_megon_class("round-8"));
        assert!(is_megon_class("grid-3"));
        assert!(is_megon_class("md:pad-16"));
        assert!(is_megon_class("hover:bg-blue-dark"));
        assert!(is_megon_class("dark:text-white"));
        assert!(!is_megon_class("p-4"));
        assert!(!is_megon_class("text-lg"));
    }
}
