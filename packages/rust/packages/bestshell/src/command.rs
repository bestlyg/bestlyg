use std::{
    io::Error,
    process::{Child, Command, Stdio},
};

use crate::utils;

pub fn run(buffer: String) {
    let list = split_command(&buffer);
    let mut prev_command: Option<Child> = None;
    for i in 0..list.len() {
        match run_command(&list[i], prev_command, i == list.len() - 1) {
            Ok(child) => prev_command = Some(child),
            Err(err) => {
                utils::log_error(err);
                break;
            }
        }
    }
}
fn split_command<'a>(buffer: &'a String) -> Vec<Vec<&str>> {
    buffer
        .split("|")
        .map(|s| s.trim())
        .filter(|s| !s.eq(&utils::EMPTY))
        .map(|s| s.split(" ").collect::<Vec<&str>>())
        .collect::<Vec<Vec<&str>>>()
}
fn run_command(
    cmd_str: &Vec<&str>,
    prev_command: Option<Child>,
    is_last: bool,
) -> Result<Child, Error> {
    let stdin = if let Some(prev) = prev_command {
        Stdio::from(prev.stdout.unwrap())
    } else {
        Stdio::inherit()
    };
    let stdout = if is_last {
        Stdio::inherit()
    } else {
        Stdio::from(Stdio::piped())
    };
    match Command::new(cmd_str[0])
        .args(cmd_str[1..].iter())
        .stdin(stdin)
        .stdout(stdout)
        .spawn()
    {
        Ok(mut child) => {
            child.wait().expect("child process wasn't running");
            Ok(child)
        }
        Err(err) => Err(err),
    }
}
