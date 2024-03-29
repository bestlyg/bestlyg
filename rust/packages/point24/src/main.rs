use point24::{compute24_v2, NumSize};

fn main() {
    let nums = vec![3, 9, 10, 10]
        .into_iter()
        .map(|v| v as NumSize)
        .collect::<Vec<NumSize>>();
    let ops = vec!['+', '-', '*', '/'];
    let res = compute24_v2(&nums, &ops, 24.0);
    let set = std::collections::HashSet::<String>::from_iter(res.iter().map(|v| v.clone()));
    println!("{:#?}", set.iter().collect::<Vec<&String>>());
}
