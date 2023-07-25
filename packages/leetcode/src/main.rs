mod preclude;

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

#[derive(PartialEq)]
struct RevNum(f64);
impl Eq for RevNum {}

impl PartialOrd for RevNum {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        if other.0 > self.0 {
            Some(Ordering::Greater)
        } else if other.0 < self.0 {
            Some(Ordering::Less)
        } else {
            Some(Ordering::Equal)
        }
    }
}
impl Ord for RevNum {
    fn cmp(&self, other: &RevNum) -> Ordering {
        other.0.partial_cmp(&self.0).unwrap()
    }
}

impl Solution {
    pub fn halve_array(nums: Vec<i32>) -> i32 {
        let mut res = 0;
        let mut sum = 0.0;
        let mut cur = 0.0;
        let mut q = std::collections::BinaryHeap::new();
        for num in nums {
            let num = num as f64;
            sum += num;
            q.push(RevNum(num));
        }
        cur = sum;
        while cur > sum / 2.0 {
            let top = q.pop().unwrap().0 / 2.0;
            q.push(RevNum(top));
            cur -= top;
            res += 1;
        }
        res
    }
}
