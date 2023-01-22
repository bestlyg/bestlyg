mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::max_happy_groups;
    let res = func(4, vec![1, 3, 2, 5, 2, 2, 1, 6]);
    println!("res = {res:#?}");
}

use std::collections::{BTreeMap, HashMap};
impl Solution {
    pub fn max_happy_groups(batch_size: i32, groups: Vec<i32>) -> i32 {
        let mut m = BTreeMap::<i32, i32>::new();
        let mut sum = 0;
        for group in groups {
            let num = group % batch_size;
            if num == 0 {
                sum += 1;
            } else if m.contains_key(&(batch_size - num)) && m[&(batch_size - num)] > 0 {
                let item = m.get_mut(&(batch_size - num)).unwrap();
                *item -= 1;
                sum += 1;
            } else {
                let item = m.entry(num).or_insert(0);
                *item += 1;
            }
        }
        let mut cache = HashMap::<i32, i32>::new();
        sum + Solution::dfs(m, &mut cache, batch_size, 0)
    }
    fn trans(m: &BTreeMap<i32, i32>) -> i32 {
        let mut ans = 0;
        let mut i = 0;
        for (_, v) in m.iter() {
            ans |= v << (4 * i);
            i += 1;
        }
        ans
    }
    fn dfs(
        m: BTreeMap<i32, i32>,
        cache: &mut HashMap<i32, i32>,
        batch_size: i32,
        surplus: i32,
    ) -> i32 {
        let cachek = Solution::trans(&m);
        if cache.contains_key(&cachek) {
            *cache.get(&cachek).unwrap()
        } else {
            let mut res = 0;
            for (k, v) in m.iter() {
                if *v != 0 {
                    let mut next_m = m.clone();
                    *next_m.get_mut(k).unwrap() -= 1;
                    res = res.max(
                        i32::from(surplus == 0)
                            + Solution::dfs(
                                next_m,
                                cache,
                                batch_size,
                                (batch_size - *k + surplus) % batch_size,
                            ),
                    );
                }
            }
            cache.insert(cachek, res);
            res
        }
    }
}
