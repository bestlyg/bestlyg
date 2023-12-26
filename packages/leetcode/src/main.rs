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

use std::collections::HashMap;
fn is1(num: usize, offset: usize) -> bool {
    return (num & (1 << offset)) != 0;
}
fn check1(seats: &Vec<Vec<char>>, row: usize, used: usize) -> bool {
    let mut prev = false;
    for col in 0..seats[0].len() {
        if is1(used, col) {
            if prev || seats[row][col] == '#' {
                return false;
            }
            prev = true;
        } else {
            prev = false;
        }
    }
    true
}
fn check2(seats: &Vec<Vec<char>>, used: usize, pre_used: usize) -> bool {
    for col in 0..seats[0].len() {
        if is1(used, col)
            && (col - 1 >= 0 && is1(pre_used, col - 1)
                || col + 1 < seats[0].len() && is1(pre_used, col + 1))
        {
            return false;
        }
    }
    true
}
fn dfs(
    seats: &Vec<Vec<char>>,
    cache: &mut HashMap<usize, HashMap<usize, i32>>,
    pre_used: usize,
    row: usize,
) -> i32 {
    if row < seats.len() {
        if let Some(Some(res)) = cache.get(&row).map(|item| item.get(&pre_used)) {
            *res
        } else {
            let res = (0..(1 << seats[0].len()))
                .map(|used| {
                    if check1(seats, row, used) && check2(seats, used, pre_used) {
                        used.count_ones() as i32 + dfs(seats, cache, used, row + 1)
                    } else {
                        0
                    }
                })
                .max()
                .unwrap();
            cache.entry(row).or_default().entry(pre_used).or_insert(res);
            res
        }
    } else {
        0
    }
}
impl Solution {
    pub fn max_students(seats: Vec<Vec<char>>) -> i32 {
        let mut cache = HashMap::new();
        (0..(1 << seats[0].len()))
            .map(|used| {
                if check1(&seats, 0, used) {
                    used.count_ones() as i32 + dfs(&seats, &mut cache, used, 1)
                } else {
                    0
                }
            })
            .max()
            .unwrap()
    }
}
