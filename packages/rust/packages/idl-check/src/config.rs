use std::{
    env,
    fs::{self},
    path::PathBuf,
};

pub struct Config {
    pub name: String,
    pub path: PathBuf,
    pub files: Vec<PathBuf>,
}

impl Config {
    pub fn new() -> Self {
        let args: Vec<String> = env::args().collect();
        assert!(args.len() == 2, "need 2 params");
        let mut args = args.into_iter();
        let name = args.next().unwrap();
        let path = args.next().unwrap();
        let path = PathBuf::from(path);
        let mut files = Vec::<PathBuf>::new();
        get_files(&path, &mut files);
        Self { name, path, files }
    }
}
const PROTO_SUFFIX: &str = ".proto";

fn get_files(p: &PathBuf, files: &mut Vec<PathBuf>) {
    let dirs = fs::read_dir(p);
    if let Ok(dirs) = dirs {
        for dir in dirs {
            if let Ok(file) = dir {
                if file.path().is_dir() {
                    get_files(&file.path(), files);
                } else if file.path().is_file()
                    && file.file_name().to_str().unwrap().ends_with(PROTO_SUFFIX)
                {
                    files.push(file.path());
                }
            }
        }
    }
}
