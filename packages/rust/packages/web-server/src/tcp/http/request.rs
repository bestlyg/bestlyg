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
    stream: TcpStream,
    header: Box<Vec<String>>,
    body: Box<Vec<u8>>,
}
impl Request {
    pub fn new(stream: TcpStream) -> Self {
        let (header, body) = analysis(&mut stream);
        Self {
            header,
            body,
            stream,
        }
    }
    pub fn raw(&mut self) -> (&mut Box<Vec<String>>, &mut Box<Vec<u8>>) {
        (&mut self.header, &mut self.body)
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
            None => Body::NONE("NONE".to_string()),
        }
    }
    pub fn print(&mut self) {
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
            ("data", body.parse_to_string(self)),
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
    JSON(String),
    FORM(String),
    FORMDATA(String),
    NONE(String),
    UNKNOWN(String),
}
impl ToString for Body {
    fn to_string(&self) -> String {
        match self {
            Body::JSON(name) => name.to_string(),
            Body::FORMDATA(name) => name.to_string(),
            Body::FORM(name) => name.to_string(),
            Body::NONE(name) => name.to_string(),
            Body::UNKNOWN(name) => name.to_string(),
        }
    }
}
impl Body {
    fn new(s: &str) -> Self {
        if s.starts_with("application/json") {
            Body::JSON(s.to_string())
        } else if s.starts_with("application/x-www-form-urlencoded") {
            Body::FORM(s.to_string())
        } else if s.starts_with("multipart/form-data") {
            Body::FORMDATA(s.to_string())
        } else {
            Body::UNKNOWN(s.to_string())
        }
    }
    fn parse_to_string(&self, request: &mut Request) -> String {
        match self {
            Body::JSON(_) => self.parse_json(request),
            Body::FORM(_) => self.parse_form(request),
            Body::FORMDATA(_) => self.parse_formdata(request),
            Body::NONE(_) => String::from("NONE"),
            Body::UNKNOWN(name) => format!("UNKNOWN {}", name.to_string()),
        }
    }
    fn parse_json(&self, request: &mut Request) -> String {
        match String::from_utf8(request.body.as_ref().clone()) {
            Ok(s) => s,
            Err(e) => format!("{:?}", e),
        }
    }
    fn parse_form(&self, request: &mut Request) -> String {
        match super::utils::decode_uri(request.body.as_ref()) {
            Ok(body) => match String::from_utf8(body) {
                Ok(data) => data,
                Err(_) => String::new(),
            },
            Err(_) => String::new(),
        }
    }
    fn parse_formdata(&self, request: &mut Request) -> String {
        let headers = request.headers();
        let body = request.raw().1;
        let length = headers.get("content-length");
        if let Some(length) = length {
            let length = length.parse::<usize>();
            if let Ok(length) = length {
                let mut buffer = [0_u8; 1024];
                while length < body.len() {
                    request.stream.read(&mut buffer);
                    // request.raw().1.as_ref().append(&mut buffer.to_vec());
                }
            }
        }

        String::from("asd")
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
