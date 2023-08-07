/// cargo run --example 2023-7-5
/// 模仿老师的思路，自己对所有权、不可变引用、可变引用这三者的规则或特性做一个集中的总结，写一个笔记列表。

#[derive(Copy, Clone, Debug)]
struct Node(i32);

fn main() {
    // 所有权

    {
        // 一个值，只能有一个持有者
        // 此时s持有了一个String
        let s = String::new();
        // 此时s1持有了s的String，那s就没有这个String了
        let s1 = s;
        // 因为s1持有了String，所以可以被print
        println!("{}", s1);
        // 因为s已经不持有String了，所以不可以用print
        // println!("{}", s); // -> Error: orrow of moved value: `s` value borrowed here after move
    }

    {
        let s = String::new();
        // 引用s，此时s_ref是s的一个不可变引用
        let s_ref = &s;
        // 不可变引用可以读取值
        // 结果和传 s 是一样的，都是打印s的值
        println!("s : [{}]", s_ref);
        // 同一时间不可变引用可以存在多个
        let s_ref2 = &s;
        let s_ref3 = &&s;
        // 打印结果和 s 一样
        println!("s : [{}]", s_ref2);
        println!("s : [{}]", s_ref3);
    }

    {
        let s = String::new();
        // 可变引用
        let mut s = s;
        // s_mut是s的一个可变引用，可以修改s的属性
        let s_mut = &mut s;
        // 此时改变s_mut的值，就是改变s的值
        s_mut.push('a');
        // 都会打印a
        println!("s : [{}]", s_mut);
        println!("s : [{}]", s);
        // 但是mut同时间只能存在一个&mut
        // push需要s是mut的才可以使用
        // 相当于声明一个let var = &mut s;
        // 再把var的所有传给push函数 String::push(var, 'b');
        s.push('b');
        // 此时可以push， 因为s_mut的最后一次使用在上面，两个&mut 不会产生交集
        // 但是如果s_mut的最后一次使用在下方，相当于说同一时间就会存在两个&mut， 此时就会报错
        // println!("s : [{}]", s_mut); // -> Error: cannot borrow `s` as mutable more than once at a time second mutable borrow occurs here
    }

    {
        // 实现了Copy的类型允许在传递所有权的时候，传递的是当前的一个拷贝
        let n1 = Node(1);
        // 此时n1不是把所有权给了n2，而是拷贝了一份给n2
        let mut n2 = n1;
        // 修改n2的值不会影响n1
        n2.0 = 2;
        println!("{n1:?}");
        println!("{n2:?}");
        // 基础的类型都已经实现了拷贝
        let num1: i32 = 1;
        let mut num2 = num1;
        num2 += 1;
        println!("{num1:?}");
        println!("{num2:?}");
    }

    {
        // 如果元祖中每一个值都实现了Copy，那这个元祖也实现了Copy
        let n1 = (1, 2);
        let mut n2 = n1;
        n2.0 += 1;
        // 此时两个值不一样
        println!("{n1:?}");
        println!("{n2:?}");

        let n1 = (1, String::new());
        let n2 = n1;
        // 此时打印 n1 会报错
        // println!("{n1:?}"); // Error
        println!("{n2:?}");
    }
}
