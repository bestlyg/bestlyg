use std::{io::Read, net::TcpStream};

pub struct Handler(TcpStream);
impl Handler {
    pub fn new(stream: TcpStream) -> Self {
        Self(stream)
    }
    fn split(&self, buffer: &[u8], size: usize) -> Vec<Vec<u8>> {
        let mut ans = Vec::new();
        let mut i = 0;
        while i < size {
            let mut item = Vec::new();
            while i < size {
                if buffer[i] == b'\r' && i + 1 < size && buffer[i + 1] == b'\n' {
                    i += 1;
                    break;
                }
                item.push(buffer[i]);
                i += 1;
            }
            ans.push(item);
            i += 1;
        }
        ans
    }
    pub fn analysis(&self, stream: &mut TcpStream) -> (Box<Vec<String>>, Box<Vec<u8>>) {
        let mut buffer = [0; 1024];
        let mut header = Box::new(Vec::<String>::new());
        let mut body = Box::new(Vec::<u8>::new());
        while let Ok(size) = stream.read(&mut buffer) {
            let list = self.split(&buffer, size);
            let mut is_header = true;
            for item in list {
                if item.len() == 0 {
                    is_header = false;
                    continue;
                }
                if is_header {
                    header.push(String::from_utf8(item).unwrap());
                } else {
                    let mut item = item;
                    body.append(&mut item);
                }
            }
            if size != buffer.len() {
                break;
            }
        }
        (header, body)
    }
}
