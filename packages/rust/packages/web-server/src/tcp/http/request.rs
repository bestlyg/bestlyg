use super::utils::{get_method_name, Method};
use std::{collections::HashMap, io::Read, net::TcpStream, rc::Rc};

fn analysis_method(method: &str) -> Method {
    match method {
        "GET" => Method::GET(method.to_string()),
        "POST" => Method::POST(method.to_string()),
        _ => Method::UNKNOWN(method.to_string()),
    }
}

fn analysis(stream: &mut TcpStream) -> (Box<Vec<String>>, Box<Vec<u8>>) {
    const SPLIT_TAG: &str = "\r\n";
    let mut buffer = [0; 1024];
    let mut header = Box::new(Vec::<String>::new());
    let mut body = Box::new(Vec::<u8>::new());
    while let Ok(size) = stream.read(&mut buffer) {
        let list = String::from_utf8_lossy(&buffer).clone();
        let list = list.split(SPLIT_TAG).collect::<Vec<&str>>();
        let mut is_header = true;
        for s in list.iter() {
            if s.eq(&"") {
                is_header = false;
                continue;
            }
            if is_header {
                header.push(s.to_string());
            } else {
                for c in s.as_bytes().iter() {
                    body.push(*c);
                }
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
        analysis_method(list[0])
    }
    pub fn url(&self) -> &str {
        let list = self.header[0].split(" ").collect::<Vec<&str>>();
        list[1]
    }
    pub fn version(&self) -> &str {
        let list = self.header[0].split(" ").collect::<Vec<&str>>();
        list[2]
    }
    pub fn headers(&self) -> HashMap<&str, &str> {
        let mut map = HashMap::new();
        for s in self.header[1..].iter() {
            let list = s.split(": ").collect::<Vec<&str>>();
            map.insert(list[0], list[1]);
        }
        map
    }
    pub fn print(&self) {
        let method = get_method_name(self.method());
        let mut list = vec![
            ("url", self.url()),
            ("method", &method),
            ("version", self.version()),
            ("headers", "---"),
        ];
        for (k, v) in self.headers().iter() {
            list.push((k, v));
        }
        let mut width = 0;
        list.iter().for_each(|(k, _)| width = width.max(k.len() + 1));
        list.iter()
            .for_each(|(k, v)| println!("    {:>width$} : {}", k, v));
    }
}
