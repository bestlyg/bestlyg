mod preclude;
use rand::Rng;

use preclude::*;
fn main() {
    let res = Solution::find_crossing_time(
        10,
        6,
        vec![
            vec![2, 10, 5, 8],
            vec![3, 5, 2, 2],
            vec![5, 8, 10, 10],
            vec![7, 8, 8, 5],
            vec![5, 6, 6, 10],
            vec![6, 10, 6, 2],
        ],
    );
    println!("res = {res:#?}");
}

use std::{cmp::Ordering, collections::BinaryHeap};
#[derive(Eq, Ord, PartialEq)]
struct Worker {
    i: i32,
    l2r: i32,
    pick_old: i32,
    r2l: i32,
    put_new: i32,
    wait: i32,
    mode: bool,
}

impl Worker {
    fn new(i: i32, l2r: i32, pick_old: i32, r2l: i32, put_new: i32) -> Self {
        Worker {
            i,
            l2r,
            pick_old,
            r2l,
            put_new,
            wait: 0,
            mode: true,
        }
    }
    fn cost(&self) -> i32 {
        self.l2r + self.r2l
    }
    fn cmp(&self, worker: &Worker) -> Ordering {
        if self.mode {
            self.cmp_bridge(worker)
        } else {
            self.cmp_wait(worker)
        }
    }
    fn cmp_bridge(&self, worker: &Worker) -> Ordering {
        if self.cost() != worker.cost() {
            self.cost().cmp(&worker.cost())
        } else {
            self.i.cmp(&worker.i)
        }
    }
    fn cmp_wait(&self, worker: &Worker) -> Ordering {
        worker.wait.cmp(&self.wait)
    }
    fn set_mode(&mut self, mode: bool) {
        self.mode = mode;
    }
    fn set_bridge_mode(&mut self) {
        self.set_mode(true)
    }
    fn set_wait_mode(&mut self) {
        self.set_mode(false)
    }
}

impl ToString for Worker {
    fn to_string(&self) -> String {
        return format!(
            "Worker{}: l2r = {}, r2l = {}, pickOld = {}, putNew = {}, cost = {}, wait = {}",
            self.i,
            self.l2r,
            self.r2l,
            self.pick_old,
            self.put_new,
            self.cost(),
            self.wait
        );
    }
}

impl PartialOrd for Worker {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

fn printHeap(name: &'static str, heap: &BinaryHeap<Worker>) {
    println!("=> {name}({})", heap.len());
    for item in heap.iter() {
        println!("{}", item.to_string());
    }
}
impl Solution {
    pub fn find_crossing_time(n: i32, k: i32, time: Vec<Vec<i32>>) -> i32 {
        let mut n = n;
        let mut workers = Vec::new();
        for i in 0..time.len() {
            workers.push(Worker::new(
                i as i32, time[i][0], time[i][1], time[i][2], time[i][3],
            ));
        }
        let mut left_heap = BinaryHeap::<Worker>::new();
        let mut right_heap = BinaryHeap::<Worker>::new();
        let mut pick_heap = BinaryHeap::<Worker>::new();
        let mut put_heap = BinaryHeap::<Worker>::new();
        for worker in workers {
            left_heap.push(worker);
        }
        let mut ans = 0;
        while n > 0 {
            // println!("====loop====");
            // println!("ans = {ans}, n = {n}");
            // printHeap("left_heap", &left_heap);
            // printHeap("right_heap", &right_heap);
            // printHeap("pick_heap", &pick_heap);
            // printHeap("put_heap", &put_heap);
            while !pick_heap.is_empty() && pick_heap.peek().unwrap().wait <= ans {
                let mut worker = pick_heap.pop().unwrap();
                worker.set_bridge_mode();
                right_heap.push(worker);
            }
            while !put_heap.is_empty() && put_heap.peek().unwrap().wait <= ans {
                let mut worker = put_heap.pop().unwrap();
                worker.set_bridge_mode();
                left_heap.push(worker);
            }
            if left_heap.is_empty() && right_heap.is_empty() {
                let pick = match pick_heap.peek() {
                    Some(worker) => worker.wait,
                    None => i32::MAX,
                };
                let put = match put_heap.peek() {
                    Some(worker) => worker.wait,
                    None => i32::MAX,
                };
                ans = pick.min(put);
            }
            if !right_heap.is_empty() {
                let mut worker = right_heap.pop().unwrap();
                ans += worker.r2l;
                worker.wait = ans + worker.put_new;
                worker.set_wait_mode();
                put_heap.push(worker);
            } else if !left_heap.is_empty() && n > 0 {
                let mut worker = left_heap.pop().unwrap();
                ans += worker.l2r;
                worker.wait = ans + worker.pick_old;
                worker.set_wait_mode();
                pick_heap.push(worker);
                n -= 1;
            }
        }
        while !right_heap.is_empty() || !pick_heap.is_empty() {
            // println!("====after====");
            // println!("ans = {ans}, n = {n}");
            // printHeap("left_heap", &left_heap);
            // printHeap("right_heap", &right_heap);
            // printHeap("pick_heap", &pick_heap);
            // printHeap("put_heap", &put_heap);
            if !right_heap.is_empty() {
                ans += right_heap.pop().unwrap().r2l;
            }
            while !pick_heap.is_empty() && pick_heap.peek().unwrap().wait <= ans {
                let mut worker = pick_heap.pop().unwrap();
                worker.set_bridge_mode();
                right_heap.push(worker);
            }
            if right_heap.is_empty() && !pick_heap.is_empty() {
                ans = pick_heap.peek().unwrap().wait;
            }
        }
        ans
    }
}
