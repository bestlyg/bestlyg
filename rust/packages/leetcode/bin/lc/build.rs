use encoding::Encoding;
use leetcode::Problem;
use std::{io::BufRead, path::PathBuf, str::FromStr};

pub(crate) const COMMAND: &'static str = "build";

pub(crate) fn command() -> clap::Command {
    clap::Command::new(COMMAND).arg(
        clap::Arg::new("filepath")
            .short('p')
            .long("filepath")
            .value_name("FILE_PATH")
            .help("A path of file that suffix is json."),
    )
}

pub(crate) async fn run(matches: &clap::ArgMatches) {
    println!(">>>>> LeetCode Builder");
    let filepath = matches.get_one::<String>("filepath");
    let file = match filepath {
        Some(path) => {
            let path = PathBuf::from_str(path).expect("Unknown path.");
            println!("From : FilePath {}", path.to_string_lossy());
            leetcode::read_from_pathbuf(&path).await
        }
        None => {
            println!("From : Stdin");
            let mut s = String::new();
            for line in std::io::stdin().lock().lines() {
                let line = line.expect("Read Line Error.");
                let decoded_content = encoding::all::GB18030
                    .decode(&line.as_bytes(), encoding::DecoderTrap::Replace)
                    .expect("Decode Error");
                s.push_str(&decoded_content);
            }
            s
        }
    };
    let value = Problem::from_str(&file).expect("Parse to Problem faile");
    println!("{value:?}");
}
