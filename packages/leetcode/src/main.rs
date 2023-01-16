mod preclude;

use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::are_sentences_similar;
    let res = func("My name is Haley".to_string(), "My Haley".to_string());
    println!("res = {res:#?}");
}

impl Solution {
    pub fn are_sentences_similar(sentence1: String, sentence2: String) -> bool {
        let l1 = sentence1.split(" ").collect::<Vec<&str>>();
        let l2 = sentence2.split(" ").collect::<Vec<&str>>();
        Solution::compare(&l1, &l2, 0, 0, false)
    }
    fn compare(l1: &Vec<&str>, l2: &Vec<&str>, i1: usize, i2: usize, inserted: bool) -> bool {
        if i1 == l1.len() && i2 == l2.len() {
            true
        } else if i1 == l1.len() || i2 == l2.len() {
            !inserted
        } else if l1[i1].cmp(l2[i2]).is_eq() {
            Solution::compare(l1, l2, i1 + 1, i2 + 1, inserted)
        } else if inserted {
            false
        } else {
            let mut next = i1;
            loop {
                let res = Solution::indexof(l1, next + 1, l2[i2]);
                if res == -1 {
                    break;
                }
                let res = res as usize;
                if Solution::compare(l1, l2, res, i2, true) {
                    return true;
                }
                next = res;
            }
            let mut next = i2;
            loop {
                let res = Solution::indexof(l2, next + 1, l1[i1]);
                if res == -1 {
                    break;
                }
                let res = res as usize;
                if Solution::compare(l1, l2, i1, res, true) {
                    return true;
                }
                next = res;
            }
            false
        }
    }
    fn indexof(l: &Vec<&str>, start: usize, s: &str) -> i32 {
        let mut i = start;
        while i < l.len() {
            if l[i].cmp(s).is_eq() {
                return i as i32;
            }
            i += 1;
        }
        return -1;
    }
}
