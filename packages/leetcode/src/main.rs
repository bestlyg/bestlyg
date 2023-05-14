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
struct Node(i32, i32);
impl Node {
    fn new(k: i32, v: i32) -> Self {
        Node(k, v)
    }
}
impl PartialOrd for Node {
    fn partial_cmp(&self, o: &Self) -> Option<std::cmp::Ordering> {
        self.1.partial_cmp(&o.1)
    }
}
impl Solution {
    pub fn rearrange_barcodes(barcodes: Vec<i32>) -> Vec<i32> {
        let mut q = std::collections::BinaryHeap::<Node>::new();
        let mut m = std::collections::HashMap::<i32, i32>::new();
        for num in barcodes {
            *m.entry(num).or_insert(0) += 1;
        }
        for (k, v) in m {
            q.push(Node::new(k, v));
        }
        let mut res = vec![];
        while q.len() >= 2 {
            let mut item1 = q.pop().unwrap();
            let mut item2 = q.pop().unwrap();
            res.push(item1.0);
            res.push(item2.0);
            item1.1 -= 1;
            item2.1 -= 1;
            if item1.1 > 0 {
                q.push(item1);
            }
            if item2.1 > 0 {
                q.push(item2);
            }
        }
        if !q.is_empty() {
            res.push(q.peek().unwrap());
        }
        res
    }
}
