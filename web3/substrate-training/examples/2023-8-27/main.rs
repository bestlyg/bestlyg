use std::fmt::Display;

/// # cargo run --example 2023-8-27
/// 实现一个打印图形面积的函数，它接收一个可以计算面积的类型作为参数，比如圆形，三角形，正方形，需要用到泛型和泛型约束

trait Shape {
    fn get_area(&self) -> f64;
}

/// 圆形
struct Round {
    r: f64,
}
impl Shape for Round {
    fn get_area(&self) -> f64 {
        std::f64::consts::PI * self.r * self.r
    }
}
impl Display for Round {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Round(r: {})", self.r)
    }
}

/// 三角形
struct Triangle {
    h: f64,
    w: f64,
}
impl Shape for Triangle {
    fn get_area(&self) -> f64 {
        self.h * self.w / 2f64
    }
}
impl Display for Triangle {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Triangle(h: {}, w: {})", self.h, self.w)
    }
}

// 四边形
struct Rectangle {
    h: f64,
    w: f64,
}
impl Shape for Rectangle {
    fn get_area(&self) -> f64 {
        self.h * self.w
    }
}
impl Display for Rectangle {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Rectangle(h: {}, w: {})", self.h, self.w)
    }
}

fn print_area<T>(shape: &T)
where
    T: Shape + Display,
{
    println!("The area of {} = {}", shape, shape.get_area());
}

fn main() {
    let shape = Round { r: 3f64 };
    print_area(&shape);

    let shape = Triangle { h: 2.0, w: 3.0 };
    print_area(&shape);

    let shape = Rectangle { h: 3f64, w: 2f64 };
    print_area(&shape);
}
