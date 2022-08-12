use std::{
    fs,
    io::Write,
    net::{TcpListener, TcpStream},
};
mod request;
mod response;
mod utils;

pub fn run(listener: &TcpListener) {
    println!(">>> Http Task");
    for stream in listener.incoming() {
        println!(">>> Request");
        if let Ok(stream) = stream {
            let mut stream = stream;
            let request = request::Request::new(&mut stream);
            request.print();
            let response = response::Response::new(&stream, &request);
            response.response();
        }
    }
}