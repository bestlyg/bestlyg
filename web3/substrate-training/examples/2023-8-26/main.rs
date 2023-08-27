/// # cargo run --example 2023-8-26
/// 实现一个函数，为u32类型的整数集合求和，参数类型为 &[u32]，返回类型为Option，溢出时返回None

fn sum(list: &[u32]) -> Option<u32> {
    let mut sum = 0u32;
    for num in list {
        sum = match sum.checked_add(*num) {
            Some(num) => num,
            None => return None,
        };
    }
    Some(sum)
}

fn main() {
    let mut list = vec![];
    for _ in 0..5 {
        let num = rand::random::<u32>() % 100_000_000;
        list.push(num);
    }
    println!("List = {:?}\nSum  = {:?}", list, sum(&list));

    list.clear();
    for _ in 0..20 {
        let num = rand::random::<u32>() % 1_000_000_000;
        list.push(num);
    }
    println!("List = {:?}\nSum  = {:?}", list, sum(&list));
}
