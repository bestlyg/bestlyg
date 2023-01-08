use std::{net::TcpListener, thread};

#[macro_use]
extern crate lazy_static;

mod handler;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:8000");
    if let Ok(listener) = listener {
        for stream in listener.incoming() {
            println!(">>> Request");
            if let Ok(stream) = stream {
                thread::spawn(move || {
                    let handler = handler::Handler::new(stream);
                });
            }
        }
    }
}
