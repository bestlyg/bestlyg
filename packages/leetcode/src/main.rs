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

impl Solution {
    pub fn filter_restaurants(
        restaurants: Vec<Vec<i32>>,
        vegan_friendly: i32,
        max_price: i32,
        max_distance: i32,
    ) -> Vec<i32> {
        let mut restaurants: Vec<Vec<i32>> = restaurants
            .into_iter()
            .filter(|item| {
                item[3] <= max_price
                    && item[4] <= max_distance
                    && (vegan_friendly == 0 || item[2] == 1)
            })
            .collect();
        restaurants.sort_by(|item1, item2| {
            if item1[1] != item2[1] {
                item2[1].cmp(&item1[1])
            } else {
                item2[0].cmp(&item1[0])
            }
        });
        restaurants.into_iter().map(|item| item[0]).collect()
    }
}
