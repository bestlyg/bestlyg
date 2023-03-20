pub type NumSize = f64;
pub fn permutation<T: Clone>(list: &[T], same: bool, pick_size: usize) -> Vec<Vec<T>> {
    use std::collections::HashSet;
    let n = list.len();
    let mut set = HashSet::<usize>::new();
    let mut res = vec![];
    let mut item: Vec<T> = vec![];
    fn dfs<T: Clone>(
        n: usize,
        pick_size: usize,
        list: &[T],
        res: &mut Vec<Vec<T>>,
        set: &mut HashSet<usize>,
        same: bool,
        item: &mut Vec<T>,
    ) {
        if item.len() == pick_size {
            res.push(item.clone());
        } else {
            for i in 0..n {
                if !same && set.contains(&i) {
                    continue;
                }
                item.push(list[i].clone());
                set.insert(i);
                dfs::<T>(n, pick_size, list, res, set, same, item);
                set.remove(&i);
                item.pop();
            }
        }
    }
    dfs::<T>(n, pick_size, list, &mut res, &mut set, same, &mut item);
    res
}
