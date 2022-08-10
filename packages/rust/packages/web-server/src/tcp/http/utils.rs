use std::collections::HashMap;

pub enum Method {
    GET(String),
    POST(String),
    UNKNOWN(String),
}
pub fn get_method_name(method: Method) -> String {
    match method {
        Method::GET(name) => name,
        Method::POST(name) => name,
        Method::UNKNOWN(name) => name,
    }
}
