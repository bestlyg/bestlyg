/// cargo run --example 2023-7-23
/// 搜索相关文档，为你自己定义的一个类型或多个类型实现加法运算（用符号 +）
/// 并构思使用Trait Object实现类型方法的调用。
use std::{
    collections::HashMap,
    ops::{Add, AddAssign},
};

type Cache = HashMap<String, i32>;

trait Point {
    fn metadata(&self) -> Cache;
    fn from(cache: &Cache) -> Self
    where
        Self: Sized;
}

#[derive(Debug, Clone, Copy)]
struct Point2D {
    x: i32,
    y: i32,
}

impl<T: Point> Add<T> for Point2D {
    type Output = Self;

    fn add(self, rhs: T) -> Self::Output {
        let m = rhs.metadata();
        Self::Output {
            x: self.x + m.get("x").unwrap_or(&0),
            y: self.y + m.get("y").unwrap_or(&0),
        }
    }
}
impl<T: Point> AddAssign<T> for Point2D {
    fn add_assign(&mut self, rhs: T) {
        let m = rhs.metadata();
        self.x += m.get("x").unwrap_or(&0);
        self.y += m.get("y").unwrap_or(&0);
    }
}

impl Point for Point2D {
    fn metadata(&self) -> Cache {
        let mut m = HashMap::new();
        m.insert("x".to_string(), self.x);
        m.insert("y".to_string(), self.y);
        m
    }
    fn from(m: &Cache) -> Self {
        Point2D {
            x: *m.get("x").unwrap_or(&0),
            y: *m.get("y").unwrap_or(&0),
        }
    }
}

#[derive(Debug, Clone, Copy)]
struct Point3D {
    x: i32,
    y: i32,
    z: i32,
}
impl<T: Point> Add<T> for Point3D {
    type Output = Self;

    fn add(self, rhs: T) -> Self::Output {
        let m = rhs.metadata();
        Self::Output {
            x: self.x + m.get("x").unwrap_or(&0),
            y: self.y + m.get("y").unwrap_or(&0),
            z: self.z + m.get("z").unwrap_or(&0),
        }
    }
}
impl<T: Point> AddAssign<T> for Point3D {
    fn add_assign(&mut self, rhs: T) {
        let m = rhs.metadata();
        self.x += m.get("x").unwrap_or(&0);
        self.y += m.get("y").unwrap_or(&0);
        self.z += m.get("z").unwrap_or(&0);
    }
}
impl Point for Point3D {
    fn metadata(&self) -> Cache {
        let mut m = HashMap::new();
        m.insert("x".to_string(), self.x);
        m.insert("y".to_string(), self.y);
        m.insert("z".to_string(), self.z);
        m
    }
    fn from(m: &Cache) -> Self {
        Point3D {
            x: *m.get("x").unwrap_or(&0),
            y: *m.get("y").unwrap_or(&0),
            z: *m.get("z").unwrap_or(&0),
        }
    }
}

fn merge<T>(p1: &dyn Point, p2: &dyn Point) -> T
where
    T: Point,
{
    let mut m1 = p1.metadata();
    let m2 = p2.metadata();
    for (k, v) in m2 {
        let item = m1.entry(k).or_insert(0);
        *item += v;
    }
    T::from(&m1)
}

fn main() {
    let p2_1 = Point2D { x: 2, y: 4 };
    let p2_2 = Point2D { x: 2, y: 4 };
    // 两个Point2D相加
    let p2_3 = p2_1 + p2_2;
    println!("p2_3 = {p2_3:?}");
    let mut p2_4 = Point2D { x: -5, y: -4 };
    // Point2D += Point2D
    p2_4 += p2_3;
    println!("p2_4 = {p2_4:?}");
    let p3_1 = Point3D { x: 2, y: 4, z: 43 };
    // Point2D += Point3D
    p2_4 += p3_1.clone();
    println!("p2_4 = {p2_4:?}");

    // dyn Point + dyn Point -> Point2D
    println!("Point2D from cache = {:?}", merge::<Point2D>(&p2_4, &p3_1));
    // dyn Point + dyn Point -> Point3D
    println!("Point3D from cache = {:?}", merge::<Point3D>(&p2_4, &p3_1));
}
