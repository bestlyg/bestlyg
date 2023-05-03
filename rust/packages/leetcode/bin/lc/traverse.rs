use leetcode::Problem;
use std::{path::PathBuf, str::FromStr};

use crate::shared;

pub(crate) const COMMAND: &'static str = "traverse";

pub(crate) fn command() -> clap::Command {
    clap::Command::new(COMMAND)
}

pub(crate) async fn run(_: &clap::ArgMatches) {
    let mut handles = vec![];
    traverse_dir(&mut handles, shared::DIR_PATH.get().unwrap().clone());
    println!("Find Problems : {}", handles.len());
    for handle in handles {
        handle.await.expect("Problem await error.");
    }
}
fn traverse_dir(handles: &mut Vec<tokio::task::JoinHandle<()>>, path: PathBuf) {
    for entry in std::fs::read_dir(path).expect("Readdir error") {
        let dir = entry.expect("DirEntry error");
        let t = dir.file_type().expect("FileType error.");
        let p = dir.path();
        if t.is_dir() {
            traverse_dir(handles, p);
        } else if t.is_file() {
            let handle = tokio::spawn(async move { traverse_file(p).await });
            handles.push(handle);
        }
    }
}
async fn traverse_file(path: PathBuf) {
    let filename = path.file_name().unwrap();
    println!(
        "===> Find a File({:?}) at {}",
        filename,
        path.to_string_lossy()
    );
    if filename.to_str().unwrap().cmp("main.json").is_eq() {
        println!("Main.json");
        return;
    }
    let file = leetcode::read_from_pathbuf(&path);
    let problem = Problem::from_str(&file).expect("Parse to Problem faile");
    // println!("{value:?}");
}
