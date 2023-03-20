use point24::{compute24, NumSize};

fn main() {
    fn is_equal(val: NumSize) -> bool {
        const TARGET: NumSize = 24.0;
        (val - TARGET).abs() <= 1e-6
    }
    let nums = vec![2, 4, 10, 10]
        .into_iter()
        .map(|v| v as NumSize)
        .collect::<Vec<NumSize>>();
    let ops = vec!['+', '-', '*', '/'];
    let res = compute24(&nums, &ops, is_equal);
    let set = std::collections::HashSet::<String>::from_iter(res.iter().map(|v| v.clone()));
    println!("{:#?}", set.iter().collect::<Vec<&String>>());
}
