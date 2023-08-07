/// cargo run --example 2023-6-28
mod print1;

fn main() {
    println!("===> 添加一个一层子模块,循环打印从'a'~'Z'之间的所有字符");
    print1::print();
    println!("===> 添加一个二层子模块,循环打印从'A'~'z'之间的所有字符");
    print1::print2::print();
}
