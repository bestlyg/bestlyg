mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

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

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    x: i32,
    y: i32,
}
impl Node {
    fn new(x: i32, y: i32) -> Self {
        Node { x, y }
    }
    fn val(&self) -> f64 {
        (self.x + 1) as f64 / (self.y + 1) as f64 - self.x as f64 / self.y as f64
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.val().partial_cmp(&o.val())
    }
}
impl Solution {
    pub fn max_score_words(words: Vec<String>, letters: Vec<char>, score: Vec<i32>) -> i32 {
        let words = words
            .into_iter()
            .map(|s| s.chars().collect::<Vec<char>>())
            .collect::<Vec<Vec<char>>>();
        let mut ans = 0;
        let n = words.len();
        let list = letters.into_iter().fold([0; 26], |list, c| {
            let mut list = list;
            list[c as usize - 'a' as usize] += 1;
            list
        });
        let wscore = words
            .iter()
            .map(|w| {
                let mut s = 0;
                for c in w.iter() {
                    s += score[*c as usize - 'a' as usize];
                }
                s
            })
            .collect::<Vec<i32>>();
        for i in 0..(1 << n) {
            let mut clist = list.clone();
            let mut f = true;
            let mut s = 0;
            for j in 0..n {
                if (i & (1 << j)) != 0 {
                    s += wscore[j];
                    for c in words[j].iter() {
                        if clist[*c as usize - 'a' as usize] == 0 {
                            f = false;
                            break;
                        }
                        clist[*c as usize - 'a' as usize] -= 1;
                    }
                }
            }
            if f {
                ans = ans.max(s);
            }
        }
        ans
    }
}
