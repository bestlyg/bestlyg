mod preclude;

use preclude::*;
fn main() {}

impl Solution {
    pub fn can_be_equal(target: Vec<i32>, arr: Vec<i32>) -> bool {
        let mut map = [5; 1005];
        for num in arr {
            map[num as usize] += 1;
        }
        for num in target {
            if map[num as usize] == 0 {
                return false;
            }
            map[num as usize] -= 1;
        }
        true
    }
}
