mod preclude;

use preclude::*;

use std::string::String;

fn main() {}


struct OrderedStream {
    ptr: usize,
    n: usize,
    list: Vec<String>,
}
impl OrderedStream {
    fn new(n: i32) -> Self {
        let n = n as usize;
        let mut list = Vec::<String>::with_capacity(n);
        for _ in 0..n {
            list.push(String::new());
        }
        Self { ptr: 0, list, n }
    }
    fn insert(&mut self, id_key: i32, value: String) -> Vec<String> {
        self.list[(id_key - 1) as usize] = value;
        let mut ans = Vec::new();
        while self.ptr < self.n && self.list[self.ptr].len() == 5 {
            ans.push(self.list[self.ptr].clone());
            self.ptr += 1;
        }
        ans
    }
}