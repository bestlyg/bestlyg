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

type Position = (usize, usize);
#[derive(Clone, Copy, Debug)]
struct Node {
    p: Position,
    b: Position,
}
impl Node {
    fn new(p: Position, b: Position) -> Self {
        Self { p, b }
    }
}

impl Solution {
    pub fn min_push_box(mut grid: Vec<Vec<char>>) -> i32 {
        let mut p: Position = (0, 0);
        let mut b: Position = (0, 0);
        let mut t: Position = (0, 0);
        let n = grid.len();
        let m = grid[0].len();
        let mut used = HashMap::<usize, HashMap<usize, bool>>::new();
        let is_same = |a: Position, b: Position| a.0 == b.0 && a.1 == b.1;
        let is_valid = |v: (i32, i32)| 0 <= v.0 && v.0 < n as i32 && 0 <= v.1 && v.1 < m as i32;
        let get_uf = |grid: &Vec<Vec<char>>, cur: Node| {
            let mut uf = UnionFind::new(n * m);
            for i in 0..n {
                for j in 0..m {
                    if grid[i][j] == '.' && !is_same(cur.b, (i, j)) {
                        for k in 0..4 {
                            let ni = i as i32 + dirs[k][0];
                            let nj = j as i32 + dirs[k][1];
                            if is_valid((ni, nj))
                                && grid[ni as usize][nj as usize] == '.'
                                && !is_same(cur.b, (ni as usize, nj as usize))
                            {
                                uf.uni(pos2Idx(i, j, m), pos2Idx(ni as usize, nj as usize, m));
                            }
                        }
                    }
                }
            }
            uf
        };
        for i in 0..n {
            for j in 0..m {
                let t1 = grid[i][j] == 'T';
                let t2 = grid[i][j] == 'B';
                let t3 = grid[i][j] == 'S';
                if t1 {
                    t = (i, j);
                    grid[i][j] = '.';
                } else if t2 {
                    b = (i, j);
                    grid[i][j] = '.';
                } else if t3 {
                    p = (i, j);
                    grid[i][j] = '.';
                }
            }
        }
        let mut q = VecDeque::<Node>::new();
        q.push_back(Node::new(p, b));
        let mut size = 1;
        let mut step = 0;
        while let Some(cur) = q.pop_front() {
            println!("{:?}", cur);
            if is_same(cur.b, t) {
                return step;
            }
            let mut uf = get_uf(&grid, cur);
            for k in 0..4 {
                let ni = cur.b.0 as i32 + dirs[k][0];
                let nj = cur.b.1 as i32 + dirs[k][1];
                let bi = cur.b.0 as i32 - dirs[k][0];
                let bj = cur.b.1 as i32 - dirs[k][1];
                let pidx = pos2Idx(cur.p.0, cur.p.1, m);
                let bidx = pos2Idx(cur.b.0, cur.b.1, m);
                println!(
                    "ni = {ni}, nj = {nj}, bi = {bi}, bj = {bj}, same = ,{}",
                    uf.same(pidx, pos2Idx(bi as usize, bj as usize, m))
                );
                if is_valid((ni, nj))
                    && grid[ni as usize][nj as usize] == '.'
                    && is_valid((bi, bj))
                    && grid[bi as usize][bj as usize] == '.'
                    && uf.same(pidx, pos2Idx(bi as usize, bj as usize, m))
                {
                    if used.contains_key(&bidx)
                        && used.get(&bidx).unwrap().contains_key(&pos2Idx(
                            ni as usize,
                            nj as usize,
                            m,
                        ))
                    {
                        continue;
                    }
                    let ni = ni as usize;
                    let nj = nj as usize;
                    println!("push {},{}", ni, nj);
                    q.push_back(Node::new(cur.b, (ni, nj)));
                    let item = used.entry(bidx).or_insert(HashMap::new());
                    *item.entry(pos2Idx(ni, nj, m)).or_insert(false) = true;
                }
            }
            size -= 1;
            if size == 0 {
                size = q.len();
                step += 1;
            }
        }
        -1
    }
}
