use crate::global::GLOBAL;
use std::io::{self, Error, Write};
use sysinfo::{ProcessExt, SystemExt, UserExt};

pub fn show() -> Result<(), Error> {
    let user = GLOBAL.get_current_user();
    let process = GLOBAL.get_current_process();
    let username = user.name();
    let hostname = GLOBAL.system.host_name();
    let hostname = if let Some(name) = hostname {
        name
    } else {
        "host_name".to_string()
    };
    let cwd = if let Some(p) = process.cwd().file_stem() {
        p.to_str().unwrap()
    } else {
        "/"
    };
    let tag = if GLOBAL.uid.abs_diff(0) == 0 {
        "#"
    } else {
        "%"
    };
    if let Err(err) = write!(
        &mut io::stdout(),
        "{}@{} {} {} ",
        username,
        hostname,
        cwd,
        tag
    ) {
        panic!("err : {}", err);
    };
    if let Err(err) = io::stdout().flush() {
        panic!("err : {}", err);
    };
    Ok(())
}
