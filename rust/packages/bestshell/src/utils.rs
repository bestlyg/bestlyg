use std::{
    fs,
    io::{self, Error},
    path::Path,
    result::Result,
};

pub const EXIT: &str = "exit";
pub const EMPTY: &str = "";
pub const PATH_LOGIN: &str = ".bestshell_login";
pub const PATH_LOGOUT: &str = ".bestshell_logout";

pub fn read_line() -> Result<String, Error> {
    let mut buffer = String::new();
    match io::stdin().read_line(&mut buffer) {
        Ok(_) => Ok(buffer),
        Err(error) => Err(error),
    }
}

pub fn log_error(err: Error) {
    println!("err : {}", err);
}

pub fn read_file(path: &str) -> Result<String, Error> {
    fs::read_to_string(Path::new(path).display().to_string())
}
