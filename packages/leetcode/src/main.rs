mod preclude;

use preclude::*;
fn main() {
    let res = Solution::evaluate(
        "(name)is(age)yearsold".to_string(),
        vec![
            vec!["name".to_string(), "bob".to_string()],
            vec!["age".to_string(), "two".to_string()],
        ],
    );
    println!("res = {res:#?}");
}

use std::collections::HashMap;
impl Solution {
    pub fn evaluate(s: String, knowledge: Vec<Vec<String>>) -> String {
        let s = s.chars().collect::<Vec<char>>();
        let mut ans = String::new();
        let mut m = HashMap::<String, String>::new();
        for item in knowledge {
            m.insert(item[0].clone(), item[1].clone());
        }
        let default_value = "?".to_string();
        let mut i = 0;
        while i < s.len() {
            if s[i] != '(' {
                ans.push(s[i]);
            } else {
                let start = i + 1;
                while s[i] != ')' {
                    i += 1;
                }
                let key = s[start..i].iter().collect::<String>();
                let s: &String = m.get(&key).unwrap_or_else(||&default_value);
                ans.push_str(s);
            }
            i += 1;
        }
        ans
    }
}
