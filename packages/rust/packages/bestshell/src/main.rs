#[macro_use]
extern crate lazy_static;

mod global;
mod hooks;
mod info;
mod utils;
mod command;
mod bestshell;

fn main(){
    bestshell::run();
}

