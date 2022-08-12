use std::{fs, io::Write, net::TcpStream};

use super::request;

pub struct Response<'a> {
    request: &'a request::Request,
    stream: &'a TcpStream,
}

impl<'a> Response<'a> {
    pub fn new(stream: &'a TcpStream, request: &'a request::Request) -> Self {
        Self { request, stream }
    }
    pub fn response(&self) {
        self.to_file();
    }
    fn to_file(&self) {
        let contents = fs::read_to_string("./src/tcp/http/index.html").unwrap();
        let response = format!(
            "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}",
            contents.len(),
            contents
        );
        let mut stream = self.stream;
        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    }
}
