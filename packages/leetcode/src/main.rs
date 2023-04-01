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

const dirs: [[i32; 2]; 4] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
#[derive(Clone, PartialEq, Eq, Ord)]
struct Node {
    row: usize,
    col: usize,
    time: i32,
}
impl Node {
    fn new(row: usize, col: usize, time: i32) -> Self {
        Node { row, col, time }
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.time.partial_cmp(&o.time)
    }
}

fn get_primes(max: usize) -> Vec<usize> {
    let mut primes = vec![0; max];
    for i in 2..max {
        if primes[i] == 0 {
            primes[0] += 1;
            let idx = primes[0];
            primes[idx] = i;
        }
        for j in 1..=primes[0] {
            let idx = i * primes[j];
            if idx >= max {
                break;
            }
            primes[idx] = 1;
            if i % primes[j] == 0 {
                break;
            }
        }
    }
    primes
}

impl Solution {
    pub fn mask_pii(s: String) -> String {
        let s = s.chars().collect::<Vec<char>>();
        fn format_email(s: &Vec<char>) -> String {
            let mut res = String::new();
            res.push_str(&s[0].to_lowercase().to_string());
            res.push_str("*****");
            let mut i = 0;
            while s[i + 1] != '@' {
                i += 1;
            }
            while i < s.len() {
                res.push_str(&s[i].to_lowercase().to_string());
                i += 1;
            }
            res
        }

        fn format_phone(s: &Vec<char>) -> String {
            let mut formats = vec![];
            for c in s {
                if c.is_numeric() {
                    formats.push(*c);
                }
            }
            let mut res = String::new();
            match formats.len() - 10 {
                1 => res.push_str("+*-"),
                2 => res.push_str("+**-"),
                3 => res.push_str("+***-"),
                _ => {}
            }
            res.push_str("***-***-");
            res.push_str(
                &String::from_utf8(
                    formats[formats.len() - 4..]
                        .iter()
                        .map(|v| *v as u8)
                        .collect::<Vec<u8>>(),
                )
                .unwrap(),
            );
            res
        }
        if s.contains(&'@') {
            format_email(&s)
        } else {
            format_phone(&s)
        }
    }
}
