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

impl Solution {
    pub fn special_perm(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut cache = vec![vec![0; n + 1]; 1 << n];
        fn dfs(nums: &Vec<i32>, cache: &mut Vec<Vec<i32>>, n: usize, used: i32, prev: i32) -> i32 {
            if (used as usize) == (1 << (n as u64)) - 1 {
                1
            } else if cache[used as usize][(prev + 1) as usize] != 0 {
                cache[used as usize][(prev + 1) as usize]
            } else {
                for i in 0..n {
                    if (used & (1 << i)) == 0
                        && (prev == -1
                            || nums[i] % nums[prev as usize] == 0
                            || nums[prev as usize] % nums[i] == 0)
                    {
                        cache[used as usize][(prev + 1) as usize] = (cache[used as usize]
                            [(prev + 1) as usize]
                            + dfs(nums, cache, n, used | (1 << i), i as i32))
                            % (1000000000 + 7);
                    }
                }
                cache[used as usize][(prev + 1) as usize]
            }
        }
        return dfs(&nums, &mut cache, n, 0, -1);
    }
}
