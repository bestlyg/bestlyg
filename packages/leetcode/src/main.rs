mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;
use std::hash::Hash;

use preclude::*;
fn main() {
    let func = Solution::btree_game_winning_move;
    // let res = func(3, vec![vec![0, 1], vec![0, 2]], vec![vec![1, 0]]);
    // println!("res = {res:#?}");
}

// use std::cell::RefCell;
// use std::rc::Rc;
// #[derive(Clone)]
// struct Node {
//     cnt: i32,
//     lcnt: i32,
//     rcnt: i32,
//     p: Option<Rc<RefCell<TreeNode>>>,
// }
// impl Node {
//     fn new() -> Self {
//         Self {
//             cnt: 0,
//             lcnt: 0,
//             rcnt: 0,
//             p: None,
//         }
//     }
// }

impl Solution {
    pub fn min_cost(basket1: Vec<i32>, basket2: Vec<i32>) -> i64 {
        use std::collections::HashMap;
        let mut m = HashMap::<i32, i32>::new();
        for num in basket1 {
            let v = m.entry(num).or_insert(0);
            *v += 1;
        }
        for num in basket2 {
            let v = m.entry(num).or_insert(0);
            *v -= 1;
        }
        let mut nmin = i32::MAX;
        let mut list = vec![];
        for (k, v) in m.iter() {
            if *v % 2 != 0 {
                return -1;
            }
            nmin = nmin.min(*k);
            for _ in 0..(*v).abs() / 2 {
                list.push(*k);
            }
        }
        list.sort()
        let ans = 0;
        for i in 0..list.len() / 2 {
            ans += list[i].min(nmin * 2) as i64;
        }
        ans
    }
}
