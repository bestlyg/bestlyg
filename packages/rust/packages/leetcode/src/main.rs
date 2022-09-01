mod preclude;

use preclude::*;
fn main() {}

impl Solution {
    pub fn final_prices(prices: Vec<i32>) -> Vec<i32> {
        let mut s = Vec::<usize>::new();
        let mut prices = prices;
        for i in 0..prices.len() {
            while !s.is_empty() && prices[*s.last().unwrap()] >= prices[i] {
                let prev = s.pop().unwrap();
                prices[prev] -= prices[i];
            }
            s.push(i);
        }
        prices
    }
}
