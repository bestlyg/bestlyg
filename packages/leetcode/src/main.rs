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

#[derive(Clone, PartialEq, Eq, Ord)]
struct Node<'a> {
    idx: usize,
    intervals: &'a Vec<Vec<i32>>,
}
impl<'a> Node<'a> {
    fn new(idx: usize, intervals: &'a Vec<Vec<i32>>) -> Self {
        Node { idx, intervals }
    }
    fn len(&self) -> i32 {
        self.intervals[self.idx][1] - self.intervals[self.idx][0] + 1
    }
}
impl PartialOrd for Node<'_> {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.len().partial_cmp(&o.len())
    }
}

impl Solution {
    pub fn min_interval(mut intervals: Vec<Vec<i32>>, queries: Vec<i32>) -> Vec<i32> {
        let mut res = vec![-1; queries.len()];
        intervals.sort_by_key(|v| v[0]);
        let mut idxs = vec![0; queries.len()]
            .into_iter()
            .enumerate()
            .map(|v| v.0)
            .collect::<Vec<_>>();
        idxs.sort_by_key(|i| queries[*i]);
        let mut q = std::collections::BinaryHeap::<Node>::new();
        let mut iidx = 0;
        for idx in idxs {
            let cur = queries[idx];
            while iidx < intervals.len() && intervals[iidx][0] <= cur {
                q.push(Node::new(iidx, &intervals));
                iidx += 1;
            }
            while !q.is_empty() && intervals[q.peek().unwrap().idx][1] < cur {
                q.pop();
            }
            if !q.is_empty() {
                res[idx] = q.peek().unwrap().len();
            }
        }
        res
    }
}
