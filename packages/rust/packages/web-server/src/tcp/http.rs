use std::{
    fs,
    io::{Write},
    net::{TcpListener, TcpStream},
};
mod utils;
mod request;

pub fn run(listener: &TcpListener) {
    println!(">>> Http Task");
    for stream in listener.incoming() {
        println!(">>> Request");
        if let Ok(stream) = stream {
            let mut stream = stream;
            let request = request::Request::new(&mut stream);
            request.print();
            response(&mut stream);
        }
    }
}

fn response(stream: &mut TcpStream) {
    let contents = fs::read_to_string("./src/tcp/http/index.html").unwrap();
    let response = format!(
        "HTTP/1.1 200 OK\r\nContent-Length: {}\r\n\r\n{}",
        contents.len(),
        contents
    );
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
