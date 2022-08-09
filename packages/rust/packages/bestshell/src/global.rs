use sysinfo::{Pid, Process, ProcessExt, System, SystemExt, Uid, User, UserExt};

lazy_static! {
    pub static ref GLOBAL: Global = Global::new();
}

pub struct Global {
    pub system: System,
    pub pid: Pid,
    pub uid: Uid,
    pub username: String,
}

impl Global {
    pub fn new() -> Self {
        let mut system = System::new_all();
        system.refresh_all();
        let pid = sysinfo::get_current_pid().unwrap();
        let process = system.process(pid).unwrap();
        let uid = (*process.user_id().unwrap()).clone();
        let user = system.get_user_by_id(&uid).unwrap();
        let username = String::from(user.name());
        Global {
            system,
            pid,
            uid,
            username,
        }
    }
    // pub fn refresh(&mut self) -> &mut Self {
    //     self.system.refresh_all();
    //     self
    // }
    pub fn get_current_process(&self) -> &Process {
        self.system.process(self.pid).unwrap()
    }
    pub fn get_current_user(&self) -> &User {
        self.system.get_user_by_id(&self.uid).unwrap()
    }
}
