use std::collections::HashMap;

/// cargo run --example 2023-7-26
/// cargo expand --example 2023-7-26
/// 一个简单的声明宏，并理解其代码结构，和编译过程。

macro_rules! map_params {
    // 匹配map_params!(m, k, v, ...);
    // k 字面量或者变量名
    // v 字面量或者变量名
    ($m:ident, $key: ident: $val: literal, $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    ($m:ident, $key: literal: $val: literal, $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    ($m:ident, $key: ident: $val: ident, $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    ($m:ident, $key: literal: $val: ident, $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    // 匹配map_params!(m, k, v ...);
    // k 字面量或者变量名
    // v 字面量或者变量名
    // 这四行去除末尾必须有逗号的因素干扰
    ($m:ident, $key: ident: $val: literal $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    ($m:ident, $key: literal: $val: literal $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    ($m:ident, $key: ident: $val: ident $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    ($m:ident, $key: literal: $val: ident $($rest:tt)*) => {
        $m.insert($key, $val);
        map_params!($m, $($rest)*);
    };
    // 最后的匹配
    ($m:ident,)=>{};
}

// 匹配map初始化。
macro_rules! map {
    // 匹配 HashMap{ k: v }
    ($ctor: ident{$($rest:tt)*}) => {{
        let mut _m = map!($ctor);
        map_params!(_m, $($rest)*);
        _m
    }};
    // 匹配 HashMap
    ($ctor: ident) => {{
        $ctor::new()
    }};
    // 匹配 std::collections::HashMap::<_, _>{ k: v }
    ($ctor: ty{$($rest:tt)*}) => {{
        let mut _m = map!($ctor);
        map_params!(_m, $($rest)*);
        _m
    }};
    // 匹配 std::collections::HashMap::<_, _>
    ($ctor: ty) => {{
        <$ctor>::new()
    }};
}

fn main() {
    let a = 1;
    let m: HashMap<usize, usize> = map!(std::collections::HashMap::<_, _>);
    let m = map!(std::collections::HashMap::<_, _> {
        a: 1,
        2: 4,
        a: a,
        1: 3
    });
    println!("================");
    for (k, v) in m {
        println!("key: {k}, value: {v}");
    }
    let m: HashMap<usize, usize> = map!(HashMap);
    let m = map!(HashMap {
        a: 1,
        2: 4,
        a: a,
        1: 3,
    });
    println!("================");
    for (k, v) in m {
        println!("key: {k}, value: {v}");
    }
}
