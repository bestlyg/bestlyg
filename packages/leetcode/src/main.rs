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
    pub fn num_tile_possibilities(tiles: String) -> i32 {
        use std::collections::HashSet;
        let tiles = tiles.as_bytes().iter().map(|v| *v).collect::<Vec<u8>>();
        let mut s = HashSet::<String>::new();
        let mut idxs = HashSet::<usize>::new();
        fn dfs(
            s: &mut HashSet<String>,
            idxs: &mut HashSet<usize>,
            tiles: &Vec<u8>,
            cur: &mut Vec<u8>,
        ) {
            s.insert(String::from_utf8(cur.clone()).unwrap());
            if cur.len() != tiles.len() {
                for i in 0..tiles.len() {
                    if !idxs.contains(&i) {
                        idxs.insert(i);
                        cur.push(tiles[i]);
                        dfs(s, idxs, tiles, cur);
                        cur.pop();
                        idxs.remove(&i);
                    }
                }
            }
        }
        let mut cur: Vec<u8> = vec![];
        dfs(&mut s, &mut idxs, &tiles, &mut cur);
        (s.len() - 1) as i32
    }
}
