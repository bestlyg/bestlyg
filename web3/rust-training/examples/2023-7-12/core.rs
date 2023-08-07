use std::{collections::BTreeSet, fmt::Display};

use crate::database::{CLASS_TABLE, CLUB_TABLE, COURSE_TABLE};

#[derive(Default)]
pub struct Student {
    name: String,
    class_list: BTreeSet<usize>,
    club_list: BTreeSet<usize>,
    course_list: BTreeSet<usize>,
}

impl Student {
    pub fn new(name: String) -> Self {
        Self {
            name,
            ..Default::default()
        }
    }
    pub fn add_class(&mut self, id: usize) -> bool {
        self.class_list.insert(id)
    }
    pub fn add_club(&mut self, id: usize) -> bool {
        self.club_list.insert(id)
    }
    pub fn add_course(&mut self, id: usize) -> bool {
        self.course_list.insert(id)
    }
}

impl Display for Student {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Student {}", self.name)?;

        if !self.class_list.is_empty() {
            let table = unsafe { CLASS_TABLE.get().unwrap() };
            write!(f, "class: ")?;
            for id in &self.class_list {
                if let Some(item) = table.get(id) {
                    write!(f, "{} ", item.name)?;
                }
            }
            writeln!(f, "")?;
        }

        if !self.club_list.is_empty() {
            let table = unsafe { CLUB_TABLE.get().unwrap() };
            write!(f, "club: ")?;
            for id in &self.club_list {
                if let Some(item) = table.get(id) {
                    write!(f, "{} ", item.name)?;
                }
            }
            writeln!(f, "")?;
        }

        if !self.course_list.is_empty() {
            let table = unsafe { COURSE_TABLE.get().unwrap() };
            write!(f, "course: ")?;
            for id in &self.course_list {
                if let Some(item) = table.get(id) {
                    write!(f, "{} ", item.name)?;
                }
            }
            writeln!(f, "")?;
        }

        Ok(())
    }
}

#[derive(Default)]
pub struct Club {
    name: String,
}
impl Club {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}
impl Display for Club {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Club {}", self.name)?;
        Ok(())
    }
}

#[derive(Default)]
pub struct Class {
    name: String,
}
impl Class {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}
impl Display for Class {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Class {}", self.name)?;
        Ok(())
    }
}

#[derive(Default)]
pub struct Course {
    name: String,
}
impl Course {
    pub fn new(name: String) -> Self {
        Self { name }
    }
}
impl Display for Course {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Course {}", self.name)?;
        Ok(())
    }
}
