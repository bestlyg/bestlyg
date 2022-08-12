mod preclude;

use preclude::*;
fn main() {
    println!("Hello, world!");
}

use std::collections::*;
impl Solution {
    pub fn group_the_people(group_sizes: Vec<i32>) -> Vec<Vec<i32>> {
        let mut ans = Vec::new();
        let mut map = HashMap::<i32, Vec<Vec<i32>>>::new();
        for i in 0..group_sizes.len() {
            let k = group_sizes[i];
            let list = map.entry(k).or_insert(vec![vec![]]);
            let item = list.last_mut().unwrap();
            item.push(i as i32);
            if item.len() == k as usize {
                ans.push(item.clone());
                list.push(Vec::new());
            }
        }
        ans
    }
}
