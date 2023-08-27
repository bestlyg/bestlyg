use std::fmt::Display;

/// # cargo run --example 2023-8-25
/// 为枚举交通信号灯实现一个 trait，trait里包含一个返回时间的方法，不同的灯持续的时间不同

enum TrafficLightStatus {
    Red,
    Green,
    Yellow,
}

impl TrafficLightStatus {
    fn get_time(&self) -> u8 {
        match *self {
            Self::Green => 15,
            Self::Red => 45,
            Self::Yellow => 5,
        }
    }
}

impl Display for TrafficLightStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match *self {
                Self::Green => "Green",
                Self::Red => "Red",
                Self::Yellow => "Yellow",
            }
        )
    }
}

fn main() {
    let mut status = TrafficLightStatus::Green;
    println!("Status = {}, Time = {}", status, status.get_time());
    status = TrafficLightStatus::Red;
    println!("Status = {}, Time = {}", status, status.get_time());
    status = TrafficLightStatus::Yellow;
    println!("Status = {}, Time = {}", status, status.get_time());
}
