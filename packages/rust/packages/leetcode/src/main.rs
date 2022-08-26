mod preclude;

use preclude::*;
fn main() {}

impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        let (mut num1, mut num2) = (nums[0], nums[1]);
        if num2 > num1 {
            (num1, num2) = (num2, num1);
        }
        let mut i = 2;
        while i < nums.len() {
            if nums[i] > num1 {
                num1 = nums[i];
            } else if nums[i] > num2 {
                num2 = nums[i];
            }
        }
        (num1 - 1) * (num2 - 1)
    }
}
