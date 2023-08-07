pub fn read_line(title: &str) -> String {
    println!("{}:", title);
    let stdin = std::io::stdin();
    let mut buf = String::new();
    stdin.read_line(&mut buf).expect("Input error.");
    return buf.trim().to_string();
}
