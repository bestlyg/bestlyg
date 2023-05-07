use leetcode::Problem;
use std::{path::PathBuf, str::FromStr, sync::Arc};
use tokio::sync::Mutex;

use crate::shared;

pub(crate) const COMMAND: &'static str = "traverse";

pub(crate) fn command() -> clap::Command {
    clap::Command::new(COMMAND)
}

pub(crate) async fn run(_: &clap::ArgMatches) {
    let problems: Arc<Mutex<Vec<Problem>>> = Default::default();
    let mut handles = vec![];
    traverse_dir(
        &mut handles,
        problems.clone(),
        shared::DIR_PATH.get().unwrap().clone(),
    );
    for handle in handles {
        handle.await.expect("Problem await error.");
    }
    println!("Find Problems : {}", (*problems.lock().await).len());
}
fn traverse_dir(
    handles: &mut Vec<tokio::task::JoinHandle<()>>,
    problems: Arc<Mutex<Vec<Problem>>>,
    path: PathBuf,
) {
    for entry in std::fs::read_dir(path).expect("Readdir error") {
        let dir = entry.expect("DirEntry error");
        let t = dir.file_type().expect("FileType error.");
        let p = dir.path();
        let problems = problems.clone();
        if t.is_dir() {
            traverse_dir(handles, problems, p);
        } else if t.is_file() {
            let handle = tokio::spawn(async move { traverse_file(problems, p).await });
            handles.push(handle);
        }
    }
}
async fn traverse_file(problems: Arc<Mutex<Vec<Problem>>>, path: PathBuf) {
    let filename = path.file_name().unwrap();
    println!(
        "===> Find a File({:?}) at {}",
        filename,
        path.to_string_lossy()
    );
    if filename.to_str().unwrap().cmp("main.json").is_eq() {
        return;
    }
    let file = leetcode::read_from_pathbuf(&path).await;
    let problem =
        Problem::from_str(&file).expect(&format!("Parse to Problem faile at {:?}", filename));
    let mut problems = problems.lock().await;
    (*problems).push(problem);
}
