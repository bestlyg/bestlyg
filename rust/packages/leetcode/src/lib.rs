use std::{io::Read, str::FromStr};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum Difficulty {
    #[serde(rename = "简单")]
    Easy,
    #[serde(rename = "中等")]
    Middle,
    #[serde(rename = "困难")]
    Hard,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Problem {
    id: String,
    name: String,
    url: String,
    desc: String,
    #[serde(rename = "difficulty")]
    diff: Difficulty,
    tag: Vec<String>,
    solutions: Vec<Solution>,
}

impl FromStr for Problem {
    type Err = serde_json::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        serde_json::from_str::<Problem>(s)
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Script {
    #[serde(rename = "javascript")]
    JavaScript,
    #[serde(rename = "typescript")]
    TypeScript,
    #[serde(rename = "cpp")]
    CPlusPlus,
    #[serde(rename = "rust")]
    Rust,
    #[serde(rename = "python3")]
    Python3,
    #[serde(rename = "java")]
    Java,
    #[serde(rename = "go")]
    Go,
    #[serde(rename = "c")]
    C,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Solution {
    script: Script,
    date: usize,
    time: f64,
    memory: f64,
    desc: String,
    code: String,
}

pub fn read_from_pathbuf(path: &std::path::PathBuf) -> String {
    let mut file = std::fs::File::open(path).expect("Read File Error.");
    let mut s = String::new();
    file.read_to_string(&mut s).expect("Read File Error.");
    s
}
