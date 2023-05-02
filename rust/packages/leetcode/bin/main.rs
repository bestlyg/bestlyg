extern crate encoding;

use std::{
    io::{BufRead, Read},
    path::{Path, PathBuf},
    str::FromStr,
};

use clap::{arg, Arg, ArgMatches, Command};
use encoding::all::GB18030;
use encoding::{DecoderTrap, Encoding};
use leetcode::Problem;

fn main() {
    let global_matches = Command::new("LeetCode Doc Builder")
        .author("bestlyg@foxmail.com")
        .about("Help user to tidy the code from leetcode.")
        .version("0.0.1")
        .subcommand(
            Command::new("build").arg(
                Arg::new("filepath")
                    .short('p')
                    .long("filepath")
                    .value_name("FILE_PATH")
                    .help("A path of file that suffix is json."),
            ),
        )
        .subcommand(
            Command::new("traverse").arg(
                Arg::new("dirpath")
                    .short('p')
                    .long("dirpath")
                    .value_name("DIR_PATH")
                    .help("A path of directory."),
            ),
        )
        .arg(
            Arg::new("filepath")
                .short('p')
                .long("filepath")
                .value_name("FILE_PATH")
                .help("A path of file that suffix is json."),
        )
        .arg(arg!(-f --format "Format file from leetcode.com."))
        .get_matches();
    // let filepath = matches.get_one::<String>("filepath");
    // println!("FILEPATH:{:#?}", filepath)
    match global_matches.subcommand() {
        Some(("build", sub_m)) => build(sub_m),
        Some(("traverse", sub_m)) => traverse(sub_m),
        _ => {}
    };
}

fn build(matches: &ArgMatches) {
    println!(">>>>> LeetCode Builder");
    let filepath = matches.get_one::<String>("filepath");
    let file = match filepath {
        Some(path) => {
            let path = PathBuf::from_str(path).expect("Unknown path.");
            println!("From : FilePath {}", path.to_string_lossy());
            leetcode::read_from_pathbuf(&path)
        }
        None => {
            println!("From : Stdin");
            let mut s = String::new();
            for line in std::io::stdin().lock().lines() {
                let line = line.expect("Read Line Error.");
                let decoded_content = GB18030
                    .decode(&line.as_bytes(), DecoderTrap::Replace)
                    .expect("Decode Error");
                s.push_str(&decoded_content);
            }
            s
        }
    };
    let value = Problem::from_str(&file).expect("Parse to Problem faile");
    println!("{value:?}");
}

fn traverse(matches: &ArgMatches) {
    println!(">>>>> LeetCode Traverse");
    let dirpath = matches
        .get_one::<String>("dirpath")
        .expect("Dirpath is required.");
    let path = PathBuf::from_str(dirpath).expect("Unknown path.");
    traverse_dir(&path);
    fn traverse_dir(path: &PathBuf) {
        for entry in std::fs::read_dir(path).expect("Readdir error") {
            let dir = entry.expect("DirEntry error");
            let t = dir.file_type().expect("FileType error.");
            if t.is_dir() {
                traverse_dir(&dir.path());
            } else if t.is_file() {
                traverse_file(&dir.path());
            }
        }
    }
    fn traverse_file(path: &PathBuf) {
        let filename = path.file_name().unwrap();
        println!(
            "===> Find a File({:?}) in {}",
            filename,
            path.to_string_lossy()
        );
        if filename.to_str().unwrap().cmp("main.json").is_eq() {
            println!("Main.json");
            return;
        }
        let file = leetcode::read_from_pathbuf(path);
        let value = Problem::from_str(&file).expect("Parse to Problem faile");
        println!("{value:?}");
    }
}
