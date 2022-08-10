use protobuf_parse::{ParsedAndTypechecked, Parser};
use std::{path::PathBuf, process::exit};
mod config;
fn main() {
    let config = config::Config::new();
    let file_size = config.files.len();
    let list = config
        .files
        .iter()
        .map(|item| {
            (
                item,
                Parser::new()
                    .pure()
                    .capture_stderr()
                    .includes(&config.path)
                    .inputs([item])
                    .parse_and_typecheck(),
            )
        })
        .filter(|(_, item)| item.is_err())
        .collect::<Vec<(&PathBuf, anyhow::Result<ParsedAndTypechecked>)>>();
    for (file, data) in list.iter() {
        println!(">>> {:?}", file);
        if let Err(e) = data {
            let info = format!("{:?}", e);
            let info = info.split('\n').collect::<Vec<&str>>();
            println!("{}", info[3..].join("\n"));
        }
        println!();
    }
    println!("===[{}]===", config.name);
    println!("Roor Path : {:?}", config.path);
    println!("File Size : {}", file_size);
    println!("Success   : {}", file_size - list.len());
    println!("Fail      : {}", list.len());
    if list.len() > 0 {
        exit(1);
    }
}
