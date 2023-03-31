#![feature(print_internals)]

macro_rules! m {
    ($($s:stmt)*) => {
        $(
            { stringify!($s); 1 }
        )<<*
    };
}

fn f() -> ! {
    (return) || true
}

fn main() {
    println!("{}", f());
    println!(
        "{}{}{}",
        m! { return || true },
        m! { (return) || true },
        m! { {return false}  true  { true } {  true }  },
    );
    {
        std::io::_print(format_args!(
            "{0}{1}{2}",
            {
                "return (|| true);";
                1
            },
            {
                "(return) || true;";
                1
            },
            {
                "{ return }";
                1
            } << {
                "|| true;";
                1
            }
        ));
    };
}
