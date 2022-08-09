// use std::{path::PathBuf, slice::Iter};

// use protobuf_parse::{ParsedAndTypechecked, Parser};
// use smol::{Async, Task};

// pub fn parse<'a>(
//     config: &'a crate::config::Config,
// ) -> Vec<(&PathBuf, anyhow::Result<ParsedAndTypechecked>)> {
//     let files: Iter<'a, PathBuf> = config.files.iter();
//     for item in files {
//         let task = smol::spawn(async {
//             Parser::new()
//                 .pure()
//                 .capture_stderr()
//                 .includes(&config.path)
//                 .inputs([item])
//                 .parse_and_typecheck();
//         });
//     }
//     Vec::new()
// }
