mod preclude;

use std::borrow::Borrow;

use preclude::*;
fn main() {}

impl Solution {
    pub fn min_operations(nums: Vec<i32>, x: i32) -> i32 {
        let mut ans = i32::MAX;
        let n = nums.len();
        let (mut r, mut rsum) = (0, nums.iter().fold(0, |sum, cur| sum + cur));
        if rsum < x {
            return -1;
        }
        while r < n && rsum > x {
            rsum -= nums[r];
            r += 1;
        }
        if rsum == x {
            ans = (n - r) as i32;
        }
        let (mut l, mut lsum) = (0, 0);
        while l < n {
            lsum += nums[l];
            while r < n && (l + 1 + n - r > n || lsum + rsum > x) {
                rsum -= nums[r];
                r += 1;
            }
            if lsum + rsum == x {
                ans = ans.min((l + 1 + n - r) as i32);
            }
            l += 1;
        }
        if ans == i32::MAX {
            -1
        } else {
            ans
        }
    }
}

// class Solution {
//     public:
//         int minOperations(vector<int>& nums, int x) {
//             int ans = 0x7fffffff, n = nums.size(), r = 0, rsum = accumulate(nums.begin(), nums.end(), 0);
//             if (rsum < x) return -1;
//             while (r < n && rsum > x) rsum -= nums[r++];
//             if (rsum == x) ans = n - r;
//             for (int l = 0, lsum = 0; l < n; l++) {
//                 lsum += nums[l];
//                 while (r < n && (l + 1 + n - r > n || lsum + rsum > x)) rsum -= nums[r++];
//                 if (lsum + rsum == x) ans = min(ans, l + 1 + n - r);
//             }
//             return ans == 0x7fffffff ? -1 : ans;
//         }
//     };
