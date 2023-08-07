pub mod print2;

pub fn print() {
    for c in ('Z'..='a').rev() {
        println!("{}", c);
    }
}
