mod preclude;

use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::char::MAX;

use preclude::*;
fn main() {
    let func = Solution::btree_game_winning_move;
    // let res = func(3, vec![vec![0, 1], vec![0, 2]], vec![vec![1, 0]]);
    // println!("res = {res:#?}");
}

// use std::cell::RefCell;
// use std::rc::Rc;
// #[derive(Clone)]
// struct Node {
//     cnt: i32,
//     lcnt: i32,
//     rcnt: i32,
//     p: Option<Rc<RefCell<TreeNode>>>,
// }
// impl Node {
//     fn new() -> Self {
//         Self {
//             cnt: 0,
//             lcnt: 0,
//             rcnt: 0,
//             p: None,
//         }
//     }
// }
impl Solution {
    pub fn minimum_moves(grid: Vec<Vec<i32>>) -> i32 {
        use std::collections::VecDeque;
        let n = grid.len();
        let mut cache = vec![vec![vec![false; 2]; n]; n];
        cache[0][0][0] = true;
        let mut q = VecDeque::<(usize, usize, usize)>::new();
        q.push_back((0, 0, 0));
        let (mut step, mut size) = (0, 1);
        while !q.is_empty() {
            let (x, y, dir) = q.pop_front().unwrap();
            if x == n - 1 && y == n - 2 && dir == 0 {
                return step;
            }
            if dir == 0 && y + 2 < n && grid[x][y + 2] == 0 && !cache[x][y + 1][0] {
                q.push_back((x, y + 1, 0));
                cache[x][y + 1][0] = true;
            }
            if dir == 0
                && x + 1 < n
                && grid[x + 1][y + 1] == 0
                && grid[x + 1][y] == 0
                && !cache[x][y][1]
            {
                q.push_back((x, y, 1));
                cache[x][y][1] = true;
            }
            if dir == 0
                && x + 1 < n
                && grid[x + 1][y] == 0
                && grid[x + 1][y + 1] == 0
                && !cache[x + 1][y][0]
            {
                q.push_back((x + 1, y, 0));
                cache[x + 1][y][0] = true;
            }
            if dir == 1 && x + 2 < n && grid[x + 2][y] == 0 && !cache[x + 1][y][1] {
                q.push_back((x + 1, y, 1));
                cache[x + 1][y][1] = true;
            }
            if dir == 1
                && y + 1 < n
                && grid[x + 1][y + 1] == 0
                && grid[x][y + 1] == 0
                && !cache[x][y][0]
            {
                q.push_back((x, y, 0));
                cache[x][y][0] = true;
            }
            if dir == 1
                && y + 1 < n
                && grid[x + 1][y + 1] == 0
                && grid[x][y + 1] == 0
                && !cache[x][y + 1][1]
            {
                q.push_back((x, y + 1, 1));
                cache[x][y + 1][1] = true;
            }
            size -= 1;
            if size == 0 {
                step += 1;
                size = q.len();
            }
        }
        -1
    }
}
