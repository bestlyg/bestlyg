mod preclude;

use preclude::*;
fn main() {}

impl Solution {
    pub fn max_equal_freq(nums: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let (mut freq_map, mut cnt_map) =
            (HashMap::<usize, usize>::new(), HashMap::<i32, usize>::new());
        let mut ans = 0;
        let mut max_freq = 0;
        for i in 0..nums.len() {
            let num = nums[i];
            let cnt = cnt_map.get(&num).unwrap_or(&0);
            let prev_freq = freq_map.get_mut(cnt);
            if prev_freq.is_some() {
                *prev_freq.unwrap() -= 1;
            }
            let cnt = *cnt + 1;
            cnt_map.insert(num, cnt);
            freq_map.insert(cnt, freq_map.get(&cnt).unwrap_or(&0) + 1);
            max_freq = max_freq.max(cnt);
            if max_freq == 1
                || freq_map.get(&max_freq).unwrap_or(&0) * max_freq
                    + freq_map.get(&(max_freq - 1)).unwrap_or(&0) * (max_freq - 1)
                    == i + 1
                    && *freq_map.get(&max_freq).unwrap_or(&0) == 1
                || freq_map.get(&max_freq).unwrap_or(&0) * max_freq == i
                    && *freq_map.get(&1).unwrap_or(&0) == 1
            {
                ans = i + 1;
            }
        }
        ans as i32
    }
}
