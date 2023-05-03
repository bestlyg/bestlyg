use clap::{arg, Arg, Command};
use std::{path::PathBuf, str::FromStr};

mod build;
mod shared;
mod traverse;

#[tokio::main]
async fn main() {
    let matches = Command::new("LeetCode Doc Builder")
        .author("bestlyg@foxmail.com")
        .about("Help user to tidy the code from leetcode.")
        .version("0.0.1")
        .subcommand(build::command())
        .subcommand(traverse::command())
        .arg(
            Arg::new("dirpath")
                .short('p')
                .long("dirpath")
                .value_name("DIR_PATH")
                .required(true)
                .help("A path of directory."),
        )
        .arg(arg!(-f --format "Format file from leetcode.com."))
        .get_matches();
    let dirpath = matches
        .get_one::<String>("dirpath")
        .expect("Dirpath is required.");
    println!("===> INIT DIR_PATH {dirpath}");

    shared::DIR_PATH
        .get_or_init(|| async { PathBuf::from_str(dirpath).expect("Unknown path.") })
        .await;

    match matches.subcommand() {
        Some((build::COMMAND, sub_m)) => build::run(sub_m).await,
        Some((traverse::COMMAND, sub_m)) => traverse::run(sub_m).await,
        _ => {}
    };
}
