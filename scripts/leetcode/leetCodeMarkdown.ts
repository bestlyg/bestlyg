import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1656. 设计有序流',
  url: 'https://leetcode.cn/problems/design-an-ordered-stream/',
  difficulty: Difficulty.简单,
  tag: [Tag.设计, Tag.数组, Tag.哈希表, Tag.数据流],
  desc: `设计一个流，以 任意 顺序获取 n 个 (id, value) 对，并在多次调用时 按 id 递增的顺序 返回一些值。`,
  solutions: [
    {
      script: Script.RUST,
      time: 32,
      memory: 2.8,
      desc: '遍历',
      code: `struct OrderedStream {
    ptr: usize,
    n: usize,
    list: Vec<String>,
}
impl OrderedStream {
    fn new(n: i32) -> Self {
        let n = n as usize;
        let mut list = Vec::<String>::with_capacity(n);
        for _ in 0..n {
            list.push(String::new());
        }
        Self { ptr: 0, list, n }
    }
    fn insert(&mut self, id_key: i32, value: String) -> Vec<String> {
        self.list[(id_key - 1) as usize] = value;
        let mut ans = Vec::new();
        while self.ptr < self.n && self.list[self.ptr].len() == 5 {
            ans.push(self.list[self.ptr].clone());
            self.ptr += 1;
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
