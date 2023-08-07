use std::time::Duration;

/// cargo run --example 2023-7-12  
/// 学生管理系统  
/// 写一个简单的学生管理系统（比如，学生，社团，班级、课程等），明确类型之间的关系，进行基本的CRUD操作。  
mod core;
mod database;
mod log;
mod utils;

fn main() {
    if unsafe {
        crate::database::CLASS_TABLE
            .set(Default::default())
            .is_err()
    } || unsafe { crate::database::CLUB_TABLE.set(Default::default()).is_err() }
        || unsafe {
            crate::database::COURSE_TABLE
                .set(Default::default())
                .is_err()
        }
        || unsafe {
            crate::database::STUDENT_TABLE
                .set(Default::default())
                .is_err()
        }
    {
        println!("Init Os Error.");
        return;
    }
    loop {
        unsafe {
            log::LOGGER
                .get_or_init(|| log::GlobalLoggerState(log::LoggerState::Main))
                .0
                .run();
            std::thread::sleep(Duration::from_millis(500));
        };
    }
}
