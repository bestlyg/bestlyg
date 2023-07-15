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

fn get_len(l: &Option<Box<ListNode>>) -> usize {
    match l {
        Some(ref node) => get_len(&node.next),
        None => 0,
    }
}

fn dfs(
    mut l1: Option<Box<ListNode>>,
    mut l2: Option<Box<ListNode>>,
) -> (i32, Option<Box<ListNode>>) {
    if l1.is_none() {
        (0, l2)
    } else if l2.is_none() {
        (0, l1)
    } else {
        let node1 = l1.as_mut().unwrap();
        let node2 = l2.as_mut().unwrap();
        let (mut add, next) = dfs(node1.next.take(), node2.next.take());
        node1.val += node2.val + add;
        node1.next = next;
        add = 0;
        if node1.val >= 10 {
            node1.val -= 10;
            add = 1;
        }
        (add, l1)
    }
}

impl Solution {
    pub fn four_sum(mut nums: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
        let n = nums.len();
        let mut res = vec![];
        nums.sort();
        let mut i = 0;
        while i + 3 < n && (nums[i] <= target || nums[i] < 0) {
            if i > 0 && nums[i] == nums[i - 1] {
                i += 1;
                continue;
            }
            let mut j = i + 1;
            while j + 2 < n && (nums[i] + nums[j] <= target || nums[j] < 0) {
                if j > i + 1 && nums[j] == nums[j - 1] {
                    j += 1;
                    continue;
                }
                let num = (nums[i] + nums[j]) as i64;
                let mut l = j + 1;
                let mut r = n - 1;
                while l < r {
                    let num = num + nums[l] as i64 + nums[r] as i64;
                    let target = target as i64;
                    if num > target {
                        r -= 1;
                    } else if num < target {
                        l += 1;
                    } else {
                        res.push(vec![nums[i], nums[j], nums[l], nums[r]]);
                        while l + 1 < r && nums[l + 1] == nums[l] {
                            l += 1;
                        }
                        while r - 1 > l && nums[r - 1] == nums[r] {
                            r -= 1;
                        }
                        l += 1;
                        r -= 1;
                    }
                }
                j += 1;
            }
            i += 1;
        }
        res
    }
}
