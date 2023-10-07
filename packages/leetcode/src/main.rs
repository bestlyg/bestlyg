mod preclude;

use core::num;

use preclude::*;
fn main() {
    // let func = Solution::remove_subfolders;
    // let res = func(
    //     vec!["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
    //         .into_iter()
    //         .map(|v| v.to_string())
    //         .collect(),
    // );
    // println!("res = {res:#?}");
}

struct StockSpanner {
    idx: usize,
    arr: Vec<(usize, i32)>,
}

impl StockSpanner {
    fn new() -> Self {
        Self {
            idx: 0,
            arr: vec![],
        }
    }

    fn next(&mut self, price: i32) -> i32 {
        while !self.arr.is_empty() && self.arr.last().unwrap().1 <= price {
            self.arr.pop();
        }
        self.idx += 1;
        let res = self.idx
            - (if self.arr.is_empty() {
                0
            } else {
                self.arr.last().unwrap().0
            });
        self.arr.push((self.idx, price));
        res as i32
    }
}
