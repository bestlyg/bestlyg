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

impl Solution {
    pub fn dist_money(money: i32, children: i32) -> i32 {
        if money < children {
            -1
        } else {
            let (cnt, surplus_money) = (money / 8, money % 8);
            let surplus_children = children - cnt;
            if cnt == children {
                if surplus_money == 0 {
                    children
                } else {
                    children - 1
                }
            } else if cnt > children {
                children - 1
            } else if surplus_money == surplus_children {
                cnt
            } else if surplus_money > surplus_children {
                if surplus_children == 1 && surplus_money == 4 {
                    cnt - 1
                } else {
                    cnt
                }
            } else {
                cnt - ((surplus_children - surplus_money) as f64 / 7.0).ceil() as i32
            }
        }
    }
}
