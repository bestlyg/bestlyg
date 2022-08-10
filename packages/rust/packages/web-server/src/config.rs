use std::env::args;

pub struct Config {
    pub port: u32,
    pub net: String,
    pub task: String,
}

impl Config {
    pub fn new() -> Self {
        let args = args().collect::<Vec<String>>();
        const DEFAULT_PORT: u32 = 8000;
        let port = args
            .get(1)
            .unwrap_or(&DEFAULT_PORT.to_string())
            .parse::<u32>()
            .unwrap_or(DEFAULT_PORT);
        let mut net = String::from("tcp");
        if let Some(arg_net) = args.get(2) {
            net = arg_net.clone();
        }
        let mut task = String::from("http");
        if let Some(arg_task) = args.get(3) {
            task = arg_task.clone();
        }
        Self { port, net, task }
    }
}
