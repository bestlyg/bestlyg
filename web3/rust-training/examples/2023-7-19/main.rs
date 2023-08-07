#![feature(ptr_metadata)]
/// cargo run --example 2023-7-19
use std::mem::{size_of, size_of_val};
trait Node {
    fn print(&self);
}

struct Node1 {
    name: String,
}
impl Node1 {
    fn print_name(&self) {
        println!("Node1 name = {}", self.name);
    }
}
impl Node for Node1 {
    fn print(&self) {
        self.print_name();
    }
}
struct Node2 {
    age: u32,
}
impl Node2 {
    fn print_age(&self) {
        println!("Node2 age = {}", self.age);
    }
}
impl Node for Node2 {
    fn print(&self) {
        self.print_age();
    }
}
struct Node3 {
    sex: bool,
}
impl Node3 {
    fn print_sex(&self) {
        println!("Node3 sex = {}", self.sex);
    }
}
impl Node for Node3 {
    fn print(&self) {
        self.print_sex();
    }
}
enum Type {
    T1(Node1),
    T2(Node2),
    T3(Node3),
}
impl Type {
    fn run(&self) {
        match self {
            Type::T1(ref n) => {
                println!("Print Node1");
                n.print_name();
            }
            Type::T2(ref n) => {
                println!("Print Node2");
                n.print_age();
            }
            Type::T3(ref n) => {
                println!("Print Node3");
                n.print_sex();
            }
        }
    }
}

fn main() {
    // 使用枚举包裹三个不同的类型，并放入一个Vec中，对Vec进行遍历，调用三种不同类型的各自的方法。
    let n1 = Node1 {
        name: "LI".to_string(),
    };
    let n2 = Node2 { age: 33 };
    let n3 = Node3 { sex: false };

    let list = vec![Type::T1(n1), Type::T2(n2), Type::T3(n3)];
    for item in &list {
        item.run();
    }
    // 定义三个不同的类型，使用Trait Object，将其放入一个Vec中，对Vec进行遍历，调用三种不同类型的各自的方法。
    println!("================================");
    let n1 = Node1 {
        name: "LI".to_string(),
    };
    let n2 = Node2 { age: 33 };
    let n3 = Node3 { sex: false };
    let list: Vec<&dyn Node> = vec![&n1, &n2, &n3];
    for item in &list {
        item.print();
    }
    println!("================================");
    // 相同点:
    //
    // 两种方式都可以对于多个不同的类型进行统一管理
    // 比如 可以包装后 放进同一个数组中，这样遍历数组时就能拿到其包装后的类型去做处理，比如调用某一个函数。
    //
    // 不同点：
    //
    // 枚举包裹：
    // 用enum包裹时，需要编译时明确声明枚举的每一项包裹的类型， 如上面的Type，需要执行T1会包裹Node1
    // 遍历Vec<Type>时，获取到的每一个TypeItem，并不清楚具体是哪一个Type
    // 需要用match等方式去匹配到内部类型，如上面的impl Type里的 fn run
    // 此时在编译时 已经明确知道当前的枚举项是某一个类型
    // 那么就可以在里面做明确的操作，比如已经知道他是Node1，可以明确调用Node1的print_name或者其他方式。
    // Node1 大小为String大小， 24字节
    println!("Node1: size = {}", size_of::<Node1>());
    // Node2 大小为u32大小，    4字节
    println!("Node2: size = {}", size_of::<Node2>());
    // Node3 大小为bool大小，   1字节
    println!("Node3: size = {}", size_of::<Node3>());
    // Type  大小为最大体积的Node + tag  即 24字节 + tag， 实际32字节
    // 也就是说每一个Node被Type包裹后，都会占据32字节。
    println!("Type: size = {}", size_of::<Type>());
    //
    // dyn包裹
    // 用dyn Node包裹时，只要是实现了Node trait的struct，都可以被包裹，他可以在运行时才明确具体类型
    // 遍历Vec<&dyn Node>时，获取到的每一个NodeItem，无法明确具体的类型
    // 但是因为所有获取到都实现了trait Node，所以可以调用trait Node里声明的方法,
    // 即Node1/Node2/Node3 只可以调用print函数。
    // 本质上当塞入vec的dyn Node，已经和原来的Node结构完全不一样了，他会生成vtable
    // vtable中保存着实际所指向的调用函数，即Node1生成的dyn Node调用print会指向到Node1的print
    // 所以相比于Enum，dyn会更加的动态，但是效率会低一点，生成的代码会大一点，而且必须符合对象安全的Trait才可以生成dyn
    let node1 = Node1 {
        name: "DYN NAME".to_string(),
    };
    let ref1: &dyn Node = &node1;
    // 实际储存的vtable地址打印
    let metadata = std::ptr::metadata(ref1) as std::ptr::DynMetadata<dyn Node>;
    let metadata_ptr =
        &metadata as *const std::ptr::DynMetadata<dyn Node> as *mut () as *mut NodeMetadataPtr;
    let node_vtable_ptr = unsafe { (*metadata_ptr).vtable_ptr };
    println!("node_vtable_ptr {:p}", node_vtable_ptr);
    // 调用vtable中真实存的指向
    (node_vtable_ptr.print)(&node1);
}

struct NodeVTable {
    _mark1: &'static *const (),
    _mark2: &'static *const (),
    _mark3: &'static *const (),
    pub print: fn(node: &Node1),
}
struct NodeMetadataPtr {
    pub vtable_ptr: &'static NodeVTable,
}
