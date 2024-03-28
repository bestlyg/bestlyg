mod preclude;
use preclude::*;

fn main() {
    match std::panic::catch_unwind(|| {
        panic!("123");
        return 1;
    }) {
        Ok(a) => {
            print!("{a}");
        }
        Err(e) => {
            print!("{e:?}");
        }
    }
}
/*  */
