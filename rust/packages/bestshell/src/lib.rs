#[macro_use]
extern crate lazy_static;

mod global;
mod hooks;
mod info;
mod utils;

pub fn run() {
    let hook = hooks::Hooks::new();
    hook.on_load();
    let mut exit = false;
    while !exit {
        println!("exit = {}", exit);
        if let Err(err) = info::show() {
            utils::log_error(err);
            exit = true;
            continue;
        }
        match utils::read_line() {
            Ok(buffer) => {
                let mut buffer = buffer;
                buffer.pop();
                if buffer.eq(utils::EXIT) {
                    exit = true;
                    continue;
                }
            }
            Err(err) => {
                utils::log_error(err);
                exit = true;
                continue;
            }
        };
    }
    hook.on_unload();
}
