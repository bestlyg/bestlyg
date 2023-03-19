use point24;

fn main() {
    fn is_equal(val: NumSize) -> bool {
        const TARGET: NumSize = 24.0;
        (val - TARGET).abs() <= 1e-6
    }
    type NumSize = point24::NumSize;
    let nums = vec![2, 4, 10, 10]
        .into_iter()
        .map(|v| v as NumSize)
        .collect::<Vec<NumSize>>();
    let ops = vec!['+', '-', '*', '/'];
    let res = point24::compute24(&nums, &ops, is_equal);
    println!("{res:#?}");
    assert!(res.len() > 0);
}
