mod preclude;

use preclude::*;
fn main() {
    println!("Hello, world!");
}

use std::collections::VecDeque;
impl Solution {
    pub fn solve_equation(equation: String) -> String {
        let (mut l, mut r) = (0, 0);
        let equation = equation.split('=').collect::<Vec<&str>>();
        Solution::analysis(&mut l, &mut r, Solution::format(equation[0]), 1);
        Solution::analysis(&mut l, &mut r, Solution::format(equation[1]), -1);
        if l == 0 && r == 0 {
            String::from("Infinite solutions")
        } else if l == 0 {
            String::from("No solution")
        } else {
            format!("x={}", r / l)
        }
    }
    fn format(s: &str) -> String {
        let mut ans = s.to_string().chars().collect::<VecDeque<char>>();
        let front = ans.front().unwrap();
        if *front != '+' && *front != '-' {
            ans.push_front('+');
        }
        ans.push_front('0');
        String::from_utf8(ans.iter().map(|c| *c as u8).collect::<Vec<u8>>()).unwrap()
    }
    fn analysis(l: &mut i32, r: &mut i32, s: String, flag: i32) {
        println!("analysis");
        let s = s.chars().collect::<Vec<char>>();
        let mut i = 0;
        while i < s.len() {
            let mut num = String::new();
            if i != 0 {
                num.push(s[i - 1]);
            }
            while i < s.len() && s[i] != '+' && s[i] != '-' && s[i] != 'x' {
                num.push(s[i]);
                i += 1;
            }
            println!("num = {:?}", num);
            if i < s.len() && s[i] == 'x' {
                if num.len() == 0 || (num.len() == 1 && (num.eq("+") || num.eq("-"))) {
                    num.push('1');
                }
                *l += flag * num.parse::<i32>().unwrap();
                i += 1;
            } else {
                *r += -1 * flag * num.parse::<i32>().unwrap();
            }
            i += 1;
        }
    }
}
