use std::{
    borrow::{BorrowMut, Cow},
    collections::HashMap,
    fmt::Error,
    io::Read,
    net::TcpStream,
};

fn split(buffer: &[u8], size: usize) -> Vec<Vec<u8>> {
    let mut ans = Vec::new();
    let mut i = 0;
    while i < size {
        let mut item = Vec::new();
        while i < size {
            if buffer[i] == b'\r' && i + 1 < size && buffer[i + 1] == b'\n' {
                i += 1;
                break;
            }
            item.push(buffer[i]);
            i += 1;
        }
        ans.push(item);
        i += 1;
    }
    ans
}

fn analysis(stream: &mut TcpStream) -> (Box<Vec<String>>, Box<Vec<u8>>) {
    let mut buffer = [0; 1024];
    let mut header = Box::new(Vec::<String>::new());
    let mut body = Box::new(Vec::<u8>::new());
    while let Ok(size) = stream.read(&mut buffer) {
        let list = split(&buffer, size);
        let mut is_header = true;
        for item in list {
            if item.len() == 0 {
                is_header = false;
                continue;
            }
            if is_header {
                header.push(String::from_utf8(item).unwrap());
            } else {
                let mut item = item;
                body.append(&mut item);
            }
        }
        if size != buffer.len() {
            break;
        }
    }
    (header, body)
}

pub struct Request {
    header: Box<Vec<String>>,
    body: Box<Vec<u8>>,
}
impl Request {
    pub fn new(stream: &mut TcpStream) -> Self {
        let (header, body) = analysis(stream);
        Self { header, body }
    }
    pub fn raw(&self) -> (&Box<Vec<String>>, &Box<Vec<u8>>) {
        (&self.header, &self.body)
    }
    pub fn method(&self) -> Method {
        let list = self.header[0].split(" ").collect::<Vec<&str>>();
        Method::new(list[0])
    }
    pub fn url(&self) -> &str {
        let list = self.header[0].split(" ").collect::<Vec<&str>>();
        list[1]
    }
    pub fn version(&self) -> &str {
        let list = self.header[0].split(" ").collect::<Vec<&str>>();
        list[2]
    }
    pub fn headers(&self) -> HashMap<String, String> {
        let mut map = HashMap::new();
        for s in self.header[1..].iter() {
            let list = s.split(": ").collect::<Vec<&str>>();
            if list.len() != 2 {
                continue;
            }
            map.insert(list[0].to_lowercase(), list[1].to_lowercase());
        }
        map
    }
    pub fn body(&self) -> Body {
        match self.headers().get("content-type") {
            Some(ty) => Body::new(ty),
            None => Body::NONE,
        }
    }
    pub fn print(&self) {
        let mut list: Vec<(&str, String)> = vec![
            ("url", self.url().to_string()),
            ("method", self.method().to_string()),
            ("version", self.version().to_string()),
            ("headers", "---".to_string()),
        ];
        let headers = &self.headers();
        for (k, v) in headers.iter() {
            list.push((k, v.to_string()));
        }
        let body = self.body();
        vec![
            ("body", "---".to_string()),
            ("type", body.to_string()),
            ("raw", format!("{:?}", self.body)),
            ("size", format!("{}B", self.body.len())),
            ("data", body.parse_to_string(&self.body)),
        ]
        .into_iter()
        .for_each(|v| list.push(v));
        let mut width = 0;
        list.iter()
            .for_each(|(k, _)| width = width.max(k.len() + 1));
        list.iter()
            .for_each(|(k, v)| println!("    {:>width$} : {}", k, v));
    }
}

pub enum Body {
    JSON,
    FORM,
    NONE,
    UNKNOWN(String),
}
impl ToString for Body {
    fn to_string(&self) -> String {
        match self {
            Body::JSON => String::from("JSON"),
            Body::FORM => String::from("FORM"),
            Body::NONE => String::from("NONE"),
            Body::UNKNOWN(name) => name.to_string(),
        }
    }
}
impl Body {
    fn new(s: &str) -> Self {
        if s.eq("application/json") {
            Body::JSON
        } else if s.eq("application/x-www-form-urlencoded") {
            Body::FORM
        } else {
            Body::UNKNOWN(s.to_string())
        }
    }
    fn parse_to_string(&self, body: &Box<Vec<u8>>) -> String {
        match self {
            Body::JSON => self.parse_json(body),
            Body::FORM => self.parse_form(body),
            Body::NONE => String::from("NONE"),
            Body::UNKNOWN(name) => format!("UNKNOWN {}", name.to_string()),
        }
    }
    fn parse_json(&self, body: &Box<Vec<u8>>) -> String {
        match String::from_utf8(body.as_ref().clone()) {
            Ok(s) => s,
            Err(e) => format!("{:?}", e),
        }
    }
    fn parse_form(&self, body: &Box<Vec<u8>>) -> String {
        match super::utils::decode_uri(body.as_ref()) {
            Ok(body) => match String::from_utf8(body) {
                Ok(data) => data,
                Err(_) => String::new(),
            },
            Err(_) => String::new(),
        }
    }
}

pub enum Method {
    GET,
    POST,
    UNKNOWN(String),
}
impl Method {
    fn new(method: &str) -> Self {
        match method {
            "GET" => Method::GET,
            "POST" => Method::POST,
            _ => Method::UNKNOWN(method.to_string()),
        }
    }
}
impl ToString for Method {
    fn to_string(&self) -> String {
        match self {
            Method::GET => String::from("GET"),
            Method::POST => String::from("POST"),
            Method::UNKNOWN(name) => name.to_string(),
        }
    }
}
