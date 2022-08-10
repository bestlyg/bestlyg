#[macro_use]
extern crate lazy_static;

mod config;
mod task;
mod tcp;

fn main() {
    let config = config::Config::new();
    if config.net.eq("tcp") {
        task::tcp(config.port, &config.task);
    } else if config.net.eq("udp") {
    } else {
        println!("unknown net");
    }
}
