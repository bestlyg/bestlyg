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

fn dfs(board: &mut Vec<Vec<char>>, sum: &mut i32, i: usize, j: usize) {
    let mut list = vec![];
    for dir in dirs2 {
        let mut ni = i as i32 + dir[0];
        let mut nj = j as i32 + dir[1];
        let mut tmp = vec![];
        while ni >= 0
            && ni < board.len() as i32
            && nj >= 0
            && nj < board[0].len() as i32
            && board[ni as usize][nj as usize] == 'O'
        {
            tmp.push((ni, nj));
            ni += dir[0];
            nj += dir[1];
        }
        if ni >= 0
            && ni < board.len() as i32
            && nj >= 0
            && nj < board[0].len() as i32
            && board[ni as usize][nj as usize] == 'X'
        {
            for item in tmp {
                list.push(item);
            }
        }
    }
    *sum += list.len() as i32;
    for (i, j) in &list {
        board[*i as usize][*j as usize] = 'X';
    }
    for (i, j) in &list {
        dfs(board, sum, *i as usize, *j as usize);
    }
}

impl Solution {
    pub fn flip_chess(chessboard: Vec<String>) -> i32 {
        let chessboard = chessboard
            .into_iter()
            .map(|item| str_to_vec(&item))
            .collect::<Vec<Vec<char>>>();
        let n = chessboard.len();
        let m = chessboard[0].len();
        let mut res = 0;
        for i in 0..n {
            for j in 0..m {
                if chessboard[i][j] == '.' {
                    let mut board = chessboard.clone();
                    board[i][j] = 'X';
                    let mut sum = 0;
                    dfs(&mut board, &mut sum, i, j);
                    res = res.max(sum);
                }
            }
        }
        res
    }
}
