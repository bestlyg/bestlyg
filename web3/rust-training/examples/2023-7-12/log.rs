use std::{fmt::Display, process, sync::OnceLock};

use crate::{
    core::{Class, Club, Course, Student},
    database::{CLASS_TABLE, STUDENT_TABLE, CLUB_TABLE, COURSE_TABLE},
};

pub enum LoggerState {
    Main,
    Student,
    Class,
    Club,
    Course,
    Exit,
}

impl LoggerState {
    pub fn run(&self) {
        match self {
            LoggerState::Main
            | LoggerState::Student
            | LoggerState::Class
            | LoggerState::Club
            | LoggerState::Course => {
                println!("");
                println!("/****************************");
                println!(" *                          *");
                println!(" *   Student Management     *");
                println!(" *                          *");
                println!(" ****************************/");

                let list = self.get_oplist();
                for (id, op) in list.iter().enumerate() {
                    println!("{}. {}", id + 1, op);
                }
                let opid = crate::utils::read_line("请输入操作序号")
                    .trim()
                    .parse::<usize>();
                match opid {
                    Ok(opid) => match opid {
                        1..=5 => list[opid - 1].run(),
                        _ => println!("Unknown operator index."),
                    },
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                }
            }
            LoggerState::Exit => process::exit(0),
        }
    }
    fn get_oplist(&self) -> Vec<Operator> {
        match self {
            LoggerState::Main => vec![
                Operator::ToStudent,
                Operator::ToClass,
                Operator::ToClub,
                Operator::ToCourse,
                Operator::ToExit,
            ],
            LoggerState::Student => vec![
                Operator::ToMain,
                Operator::Add,
                Operator::List,
                Operator::UnionClass,
                Operator::UnionClub,
                Operator::UnionCourse,
                Operator::ToExit,
            ],
            LoggerState::Class => vec![
                Operator::ToMain,
                Operator::Add,
                Operator::List,
                Operator::ToExit,
            ],
            LoggerState::Club => vec![
                Operator::ToMain,
                Operator::Add,
                Operator::List,
                Operator::ToExit,
            ],
            LoggerState::Course => vec![
                Operator::ToMain,
                Operator::Add,
                Operator::List,
                Operator::ToExit,
            ],
            _ => vec![Operator::ToMain, Operator::ToExit],
        }
    }
}

pub struct GlobalLoggerState(pub LoggerState);

pub static mut LOGGER: OnceLock<GlobalLoggerState> = OnceLock::new();

enum Operator {
    ToMain,
    ToStudent,
    ToClass,
    ToClub,
    ToCourse,
    ToExit,
    Add,
    // todo
    Delete,
    // todo
    Update,
    List,
    UnionClass,
    UnionClub,
    UnionCourse,
}

impl Operator {
    fn to_string(&self) -> &'static str {
        match self {
            Operator::ToMain => "回到首页",
            Operator::ToStudent => "进入学生操作",
            Operator::ToClass => "进入班级操作",
            Operator::ToClub => "进入社团操作",
            Operator::ToCourse => "进入课程操作",
            Operator::ToExit => "退出程序",
            Operator::Add => "增加",
            Operator::Delete => "删除",
            Operator::Update => "更新",
            Operator::UnionClass => "关联班级",
            Operator::UnionClub => "关联社团",
            Operator::UnionCourse => "关联课程",
            Operator::List => "打印",
        }
    }
    fn run(&self) {
        let logger = unsafe { LOGGER.get_mut().unwrap() };
        match self {
            Operator::ToMain => logger.0 = LoggerState::Main,
            Operator::ToStudent => logger.0 = LoggerState::Student,
            Operator::ToClass => logger.0 = LoggerState::Class,
            Operator::ToClub => logger.0 = LoggerState::Club,
            Operator::ToCourse => logger.0 = LoggerState::Course,
            Operator::ToExit => logger.0 = LoggerState::Exit,
            Operator::Add => {
                let logger = unsafe { LOGGER.get().expect("Program error.") };
                match logger.0 {
                    LoggerState::Class => {
                        let table = unsafe {
                            crate::database::CLASS_TABLE
                                .get_mut()
                                .expect("Unkown error(table init).")
                        };
                        let name = crate::utils::read_line("请输入名称");
                        table.insert(Class::new(name));
                        println!("插入成功");
                    }
                    LoggerState::Student => {
                        let table = unsafe {
                            crate::database::STUDENT_TABLE
                                .get_mut()
                                .expect("Unkown error(table init).")
                        };
                        let name = crate::utils::read_line("请输入名称");
                        table.insert(Student::new(name));
                        println!("插入成功");
                    }
                    LoggerState::Club => {
                        let table = unsafe {
                            crate::database::CLUB_TABLE
                                .get_mut()
                                .expect("Unkown error(table init).")
                        };
                        let name = crate::utils::read_line("请输入名称");
                        table.insert(Club::new(name));
                        println!("插入成功");
                    }
                    LoggerState::Course => {
                        let table = unsafe {
                            crate::database::COURSE_TABLE
                                .get_mut()
                                .expect("Unkown error(table init).")
                        };
                        let name = crate::utils::read_line("请输入名称");
                        table.insert(Course::new(name));
                        println!("插入成功");
                    }
                    _ => {}
                };
            }
            Operator::List => {
                let logger = unsafe { LOGGER.get().expect("Program error.") };
                match logger.0 {
                    LoggerState::Class => {
                        let table = unsafe {
                            crate::database::CLASS_TABLE
                                .get()
                                .expect("Unkown error(table init).")
                        };
                        table.print();
                    }
                    LoggerState::Student => {
                        let table = unsafe {
                            crate::database::STUDENT_TABLE
                                .get()
                                .expect("Unkown error(table init).")
                        };
                        table.print();
                    }
                    LoggerState::Club => {
                        let table = unsafe {
                            crate::database::CLUB_TABLE
                                .get()
                                .expect("Unkown error(table init).")
                        };
                        table.print();
                    }
                    LoggerState::Course => {
                        let table = unsafe {
                            crate::database::COURSE_TABLE
                                .get()
                                .expect("Unkown error(table init).")
                        };
                        table.print();
                    }
                    _ => {}
                };
            }
            Operator::UnionClass => {
                let sid = match crate::utils::read_line("请输入学生ID")
                    .trim()
                    .parse::<usize>()
                {
                    Ok(sid) => sid,
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                };

                let student = match { unsafe { STUDENT_TABLE.get_mut().unwrap().get_mut(&sid) } } {
                    Some(o) => o,
                    None => {
                        println!("Not found student from {}.", sid);
                        return;
                    }
                };

                let cid = match crate::utils::read_line("请输入班级ID")
                    .trim()
                    .parse::<usize>()
                {
                    Ok(sid) => sid,
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                };
                if !unsafe { CLASS_TABLE.get().unwrap().contains(&cid) } {
                    println!("Not found class from {}.", cid);
                    return;
                }
                student.add_class(cid);
                println!("添加成功");
            },
            Operator::UnionClub => {
                let sid = match crate::utils::read_line("请输入学生ID")
                    .trim()
                    .parse::<usize>()
                {
                    Ok(sid) => sid,
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                };

                let student = match { unsafe { STUDENT_TABLE.get_mut().unwrap().get_mut(&sid) } } {
                    Some(o) => o,
                    None => {
                        println!("Not found student from {}.", sid);
                        return;
                    }
                };

                let cid = match crate::utils::read_line("请输入社团ID")
                    .trim()
                    .parse::<usize>()
                {
                    Ok(sid) => sid,
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                };
                if !unsafe { CLUB_TABLE.get().unwrap().contains(&cid) } {
                    println!("Not found club from {}.", cid);
                    return;
                }
                student.add_club(cid);
                println!("添加成功");
            },
            Operator::UnionCourse => {
                let sid = match crate::utils::read_line("请输入学生ID")
                    .trim()
                    .parse::<usize>()
                {
                    Ok(sid) => sid,
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                };

                let student = match { unsafe { STUDENT_TABLE.get_mut().unwrap().get_mut(&sid) } } {
                    Some(o) => o,
                    None => {
                        println!("Not found student from {}.", sid);
                        return;
                    }
                };

                let cid = match crate::utils::read_line("请输入课程ID")
                    .trim()
                    .parse::<usize>()
                {
                    Ok(sid) => sid,
                    Err(_) => {
                        println!("Please input a number.");
                        return;
                    }
                };
                if !unsafe { COURSE_TABLE.get().unwrap().contains(&cid) } {
                    println!("Not found course from {}.", cid);
                    return;
                }
                student.add_course(cid);
                println!("添加成功");
            },
            _ => {}
        };
    }
}

impl Display for Operator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}
