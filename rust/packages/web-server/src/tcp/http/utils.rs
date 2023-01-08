pub fn decode_uri(data: &Vec<u8>) -> Result<Vec<u8>, &'static str> {
    let mut ans = Vec::<u8>::new();
    let mut i = 0;
    while i < data.len() {
        if data[i] == b'%' {
            if i + 2 >= data.len() {
                return Err("error data");
            }
            ans.push(
                ((char_to_digit(data[i + 1]).unwrap() << 4) | char_to_digit(data[i + 2]).unwrap())
                    as u8,
            );
            i = i + 2;
        } else {
            ans.push(data[i]);
        }
        i += 1;
    }
    Ok(ans)
}

pub fn char_to_digit(v: u8) -> Option<u32> {
    char::from(v).to_digit(16)
}
