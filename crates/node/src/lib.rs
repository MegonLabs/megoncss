use napi_derive::napi;

#[napi]
/// Scan HTML content and return all MegonCSS class names found
pub fn scan_html(html: String) -> Vec<String> {
    megoncss_scanner::scan_classes(&html)
}

#[napi]
/// Generate CSS from a MegonCSS class name
pub fn class_to_css(class: String) -> Option<String> {
    let rule = megoncss_generator::class_to_css(&class)?;

    let selector = &rule.selector;
    let mut result = String::new();

    if let Some(ref at_rule) = rule.at_rule {
        if at_rule.starts_with('.') {
            // Dark mode: .dark .class { ... }
            result.push_str(&format!("{} {} {{ ", at_rule, selector));
        } else {
            // Media query: @media (...) { .class { ... } }
            result.push_str(&format!("{} {{ {} {{ ", at_rule, selector));
        }
    } else {
        result.push_str(&format!("{}", selector));
    }

    if let Some(ref pseudo) = rule.pseudo {
        result.push_str(&format!(":{}", pseudo));
    }

    if !result.contains('{') {
        result.push_str(" { ");
    }

    for (i, (prop, val)) in rule.properties.iter().enumerate() {
        if i > 0 {
            result.push_str("; ");
        }
        result.push_str(&format!("{}: {}", prop, val));
    }

    // Close all open braces
    let open_count = result.matches(" { ").count();
    for _ in 0..open_count {
        result.push_str(" }");
    }
    // If inline style (no braces yet), add them
    if open_count == 0 {
        result.push_str(" }");
    }

    Some(result)
}

#[napi(object)]
pub struct ScanResult {
    pub classes: Vec<String>,
    pub count: u32,
}

#[napi]
/// Full scan: parse HTML and return structured result
pub fn scan_html_full(html: String) -> ScanResult {
    let classes = megoncss_scanner::scan_classes(&html);
    let count = classes.len() as u32;
    ScanResult { classes, count }
}
