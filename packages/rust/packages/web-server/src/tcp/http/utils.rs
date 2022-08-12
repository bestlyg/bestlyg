use std::collections::HashMap;

pub enum Method {
    GET,
    POST,
    UNKNOWN(String),
}
pub fn get_method_type(method: Method) -> String {
    match method {
        Method::GET => String::from("GET"),
        Method::POST => String::from("POST"),
        Method::UNKNOWN(name) => name,
    }
}
