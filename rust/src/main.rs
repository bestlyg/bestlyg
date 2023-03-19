use point24;

fn main() {
    fn isEqual(val: NumSize) -> bool {
        const target: NumSize = 24.0;
        (val - target).abs() <= 1e-6
    }
    type NumSize = point24::NumSize;
    let nums = vec![2,4,10,10]
        .into_iter()
        .map(|v| v as NumSize)
        .collect::<Vec<NumSize>>();
    let ops = vec!['+', '-', '*', '/'];
    let res = point24::compute24(&nums, &ops, isEqual);
    println!("{res:?}");
    assert!(res.len() > 0);
}
