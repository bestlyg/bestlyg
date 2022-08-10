use std::net::TcpListener;

pub fn run(listener: &TcpListener) {
    println!("http {:?}", listener);
}
