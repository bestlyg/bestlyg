import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '641. 设计循环双端队列',
  url: 'https://leetcode.cn/problems/maximum-score-after-splitting-a-string/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你一个由若干 0 和 1 组成的字符串 s ，请你计算并返回将该字符串分割成两个 非空 子字符串（即 左 子字符串和 右 子字符串）所能获得的最大得分。`,
  solutions: [
    {
      script: Script.RUST,
      time: 4,
      memory: 2.5,
      desc: '循环队列',
      code: `struct MyCircularDeque {
    list: Vec<i32>,
    first: usize,
    last: usize,
    len: usize,
}
impl MyCircularDeque {
    fn new(k: i32) -> Self {
        let len = (k + 1) as usize;
        let mut list = Vec::with_capacity(len);
        for _ in 0..len {
            list.push(0);
        }
        MyCircularDeque {
            list,
            first: 0,
            last: 0,
            len,
        }
    }
    fn insert_front(&mut self, value: i32) -> bool {
        if self.is_full() {
            false
        } else {
            self.first = self.get_prev(self.first);
            self.list[self.first] = value;
            true
        }
    }
    fn insert_last(&mut self, value: i32) -> bool {
        if self.is_full() {
            false
        } else {
            self.list[self.last] = value;
            self.last = self.get_next(self.last);
            true
        }
    }
    fn delete_front(&mut self) -> bool {
        if self.is_empty() {
            false
        } else {
            self.first = self.get_next(self.first);
            true
        }
    }
    fn delete_last(&mut self) -> bool {
        if self.is_empty() {
            false
        } else {
            self.last = self.get_prev(self.last);
            true
        }
    }
    fn get_front(&self) -> i32 {
        if self.is_empty() {
            -1
        } else {
            self.list[self.first]
        }
    }
    fn get_rear(&self) -> i32 {
        if self.is_empty() {
            -1
        } else {
            self.list[self.get_prev(self.last)]
        }
    }
    fn is_empty(&self) -> bool {
        self.first == self.last
    }
    fn is_full(&self) -> bool {
        self.get_next(self.last) == self.first
    }
    fn get_prev(&self, cur: usize) -> usize {
        if cur == 0 {
            self.len - 1
        } else {
            cur - 1
        }
    }
    fn get_next(&self, cur: usize) -> usize {
        (cur + 1) % self.len
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
