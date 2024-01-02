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

// class Solution:
//     def getMaxRepetitions(self, s1: str, n1: int, s2: str, n2: int) -> int:
//         len1, len2 = len(s1), len(s2)
//         k = idx = cnt = 0
//         arr = [0]
//         while k < n1:
//             for i in range(len1):
//                 if s2[idx] == s1[i]:
//                     idx = (idx + 1) % len2
//                     cnt += idx == 0
//             k += 1
//             arr.append(cnt)
//             if idx == 0: break
//         return (cnt * (n1 // k) + arr[n1 % k]) // n2

impl Solution {
    pub fn get_max_repetitions(s1: String, n1: i32, s2: String, n2: i32) -> i32 {
        let (n1, n2) = (n1 as usize, n2 as usize);
        let s1 = str_to_vec(&s1);
        let s2 = str_to_vec(&s2);
        let (len1, len2) = (s1.len(), s2.len());
        let (mut k, mut idx, mut cnt) = (0, 0, 0);
        let mut arr = vec![0];
        while k < n1 {
            for i in 0..len1 {
                if s2[idx] == s1[i] {
                    idx = (idx + 1) % len2;
                    if idx == 0 {
                        cnt += 1;
                    }
                }
            }
            k += 1;
            arr.push(cnt);
            if idx == 0 {
                break;
            }
        }
        ((cnt * (n1 / k) + arr[n1 % k]) / n2) as i32
    }
}
