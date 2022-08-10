use crate::tcp;
use std::{collections::HashMap, net::TcpListener};

type TcpTask = fn(&TcpListener);

lazy_static! {
    pub static ref TCP_TASK: HashMap<String, TcpTask> = {
        let mut map = HashMap::<String, TcpTask>::new();
        map.insert(String::from("http"), tcp::http::run);
        map
    };
}

pub fn tcp(port: u32, task: &String) {
    let listener = TcpListener::bind(format!("127.0.0.1:{}", port));
    match listener {
        Ok(listener) => {
            println!("tcp listener on {}", port);
            if let Some(task) = TCP_TASK.get(task) {
                task(&listener);
            }
        }
        Err(_) => tcp(port + 1, task),
    }
}
