use std::fmt::Display;

/// # cargo run --example 2023-8-18
/// 基础要求：固定类型（比如i32）的数组排序
/// 提高部分：能够使用template和PartialOrd实现对任意类型的排序

/// 对Vec<i32> 进行冒泡排序
fn sort1(list: &mut Vec<i32>) {
    for i in 0..list.len() {
        for j in 0..list.len() - 1 - i {
            if list[j + 1] < list[j] {
                list.swap(j, j + 1);
            }
        }
    }
}

/// 对任意结实现了 比较的结构体 进行冒泡排序
/// 用切片适配各种 数组 （Vec， 固定数组等）
fn sort<T: PartialOrd>(list: &mut [T]) {
    for i in 0..list.len() {
        for j in 0..list.len() - 1 - i {
            if list[j + 1].partial_cmp(&list[j]).unwrap().is_lt() {
                list.swap(j, j + 1);
            }
        }
    }
}

#[derive(Debug, PartialEq)]
struct Object {
    val: i32,
}
impl Object {
    fn new_random() -> Self {
        let val = rand::random::<i32>() % 1000;
        Self { val }
    }
}
impl PartialOrd for Object {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        self.val.partial_cmp(&other.val)
    }
}

impl Display for Object {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "O({})", self.val)
    }
}

fn log<T: Display>(title: &str, list: &[T]) {
    print!("{:16}: [", title);
    for num in list {
        print!("{},", num);
    }
    println!("]");
}

fn main() {
    let split = "=".to_string().repeat(100);
    {
        let mut list = vec![];
        for _ in 0..20 {
            let num = rand::random::<i32>() % 1000;
            list.push(num);
        }
        log("List", &list);
        sort1(&mut list);
        log("Sorted List", &list);
    }
    println!("{}", split);
    {
        let mut list = vec![];
        for _ in 0..20 {
            list.push(Object::new_random());
        }
        log("List", &list);
        sort(&mut list);
        log("Sorted List", &list);
    }
}
