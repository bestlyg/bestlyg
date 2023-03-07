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

use std::collections::BTreeSet;
impl Solution {
    fn check_signal(expression: &Vec<char>) -> bool {
        if *expression.first().unwrap() != '{' || *expression.last().unwrap() != '}' {
            false
        } else {
            let mut level = 0;
            for i in 0..expression.len() {
                if expression[i] == '{' {
                    level += 1
                } else if expression[i] == '}' {
                    level -= 1
                }
                if i != expression.len() - 1 && level == 0 {
                    return false;
                }
            }
            true
        }
    }
    fn split(expression: &Vec<char>) -> Vec<Vec<char>> {
        let mut items: Vec<Vec<char>> = vec![];
        let mut level = 0;
        let mut prev = 0;
        let mut i = 0;
        while i < expression.len() {
            if expression[i] == '{' {
                level += 1;
            } else if expression[i] == '}' {
                level -= 1;
            } else if expression[i] == ',' && level == 0 {
                items.push(
                    expression[prev..i]
                        .iter()
                        .map(|v| *v)
                        .collect::<Vec<char>>(),
                );
                prev = i + 1;
            }
            i += 1;
        }
        items.push(expression[prev..].iter().map(|v| *v).collect::<Vec<char>>());
        items
    }
    fn analysis(item: &Vec<char>) -> Vec<Vec<Vec<char>>> {
        let mut res = vec![];
        let mut i = 0;
        while i < item.len() {
            if item[i] != '{' {
                res.push(vec![vec![item[i]]])
            } else {
                let prev = i;
                let mut level = 0;
                loop {
                    if item[i] == '{' {
                        level += 1;
                    } else if item[i] == '}' {
                        level -= 1;
                    }
                    if level == 0 {
                        break;
                    } else {
                        i += 1;
                    }
                }
                res.push(Solution::_brace_expansion_ii(
                    item[prev..i + 1].iter().map(|v| *v).collect::<Vec<char>>(),
                ))
            }
            i += 1;
        }
        res
    }
    fn dfs(s: &mut BTreeSet<Vec<char>>, res: &Vec<Vec<Vec<char>>>, start: usize, cur: Vec<char>) {
        if start == res.len() {
            s.insert(cur);
        } else {
            for item in res[start].iter() {
                let mut next = cur.clone();
                let mut other = item.clone();
                next.append(&mut other);
                Solution::dfs(s, res, start + 1, next);
            }
        }
    }
    pub fn brace_expansion_ii(expression: String) -> Vec<String> {
        let expression = expression.chars().collect::<Vec<char>>();
        Solution::_brace_expansion_ii(expression)
            .into_iter()
            .map(|v| {
                String::from_utf8(v.into_iter().map(|v| v as u8).collect::<Vec<u8>>()).unwrap()
            })
            .collect()
    }
    fn _brace_expansion_ii(expression: Vec<char>) -> Vec<Vec<char>> {
        let mut expression = expression;
        if Solution::check_signal(&expression) {
            expression.remove(expression.len() - 1);
            expression.remove(0);
        }
        let mut s = BTreeSet::<Vec<char>>::new();
        let items = Solution::split(&expression);
        if items.len() > 1 {
            for item in items {
                for res in Solution::_brace_expansion_ii(item) {
                    s.insert(res);
                }
            }
        } else {
            let res = Solution::analysis(&items[0]);
            Solution::dfs(&mut s, &res, 0, vec![]);
        }
        s.into_iter().collect::<Vec<Vec<char>>>()
    }
}
