use crate::core::{Class, Club, Course, Student};
use std::{collections::BTreeMap, fmt::Display, sync::OnceLock};

#[derive(Default)]
pub struct Table<T>(usize, BTreeMap<usize, T>);

impl<T> Table<T> {
    pub fn insert(&mut self, o: T) {
        let idx = self.0;
        self.0 += 1;
        self.1.insert(idx, o);
    }
    pub fn get(&self, id: &usize) -> Option<&T> {
        self.1.get(&id)
    }
    pub fn get_mut(&mut self, id: &usize) -> Option<&mut T> {
        self.1.get_mut(&id)
    }
    pub fn contains(&self, id: &usize) -> bool {
        self.1.contains_key(id)
    }
}
impl<T: Display> Table<T> {
    pub fn print(&self) {
        let table = &self.1;
        for (idx, item) in table {
            println!("==> id = {}", idx);
            println!("{}", item);
        }
    }
}

pub static mut STUDENT_TABLE: OnceLock<Table<Student>> = OnceLock::new();
pub static mut CLASS_TABLE: OnceLock<Table<Class>> = OnceLock::new();
pub static mut CLUB_TABLE: OnceLock<Table<Club>> = OnceLock::new();
pub static mut COURSE_TABLE: OnceLock<Table<Course>> = OnceLock::new();
