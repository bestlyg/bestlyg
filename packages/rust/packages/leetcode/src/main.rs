mod preclude;

use preclude::*;

use std::string::String;

fn main() {
    // '%E6%9D%8E'
    // 26446
    let s = "%E6%9D%8E";
    let s = "李";
    let arr = [0xE6, 0x9D, 0x8E];
    // [230, 157, 142]
    let mut v = s.escape_unicode();
    // 11001110 1001110
    // println!("{:#b},{:#b},{:#b}", 230, 157, 142);
    // 11100110 1001110   1 10001110
    println!("{:?}", v);
}
