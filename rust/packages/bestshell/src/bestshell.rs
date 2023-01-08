use crate::command;
use crate::global::GLOBAL;
use crate::hooks;
use crate::info;
use crate::utils;

pub fn run() {
    let mut hook = hooks::Hooks::new();
    load_hooks(&mut hook);
    hook.on_load();
    let mut exit = false;
    while !exit {
        if let Err(err) = info::show() {
            utils::log_error(err);
            exit = true;
            continue;
        }
        match utils::read_line() {
            Ok(buffer) => {
                let mut buffer = buffer;
                buffer.pop();
                if buffer.eq(utils::EXIT) {
                    exit = true;
                    continue;
                } else if buffer.eq(utils::EMPTY) {
                    continue;
                } else {
                    command::run(buffer);
                }
            }
            Err(err) => {
                utils::log_error(err);
                exit = true;
                continue;
            }
        };
    }
    hook.on_unload();
}

fn load_hooks(hook: &mut hooks::Hooks) {
    macro_rules! run_file {
        ($file:ident) => {
            $file
                .split("\n")
                .map(|s| s.trim())
                .filter(|s| !s.eq(&utils::EMPTY))
                .for_each(|s| command::run(String::from(s)));
        };
    }
    hook.add_on_load(|| {
        if let Ok(file) =
            utils::read_file(&format!("/Users/{}/{}", GLOBAL.username, utils::PATH_LOGIN))
        {
            run_file!(file);
        }
    });
    hook.add_on_unload(|| {
        if let Ok(file) = utils::read_file(&format!(
            "/Users/{}/{}",
            GLOBAL.username,
            utils::PATH_LOGOUT
        )) {
            run_file!(file);
        }
    });
}
