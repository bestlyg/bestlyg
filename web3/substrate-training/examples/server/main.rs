#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

/// cargo run --example server
/// curl -X POST localhost:8000/address/new

mod controllers;

fn main() {
    run_web_server();
}

fn run_web_server() {
    rocket::ignite()
        .mount("/", routes![controllers::home::index])
        // 地址
        .mount("/", routes![controllers::address::new_address])
        .launch();
}

