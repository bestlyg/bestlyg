import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '622. 设计循环队列',
  url: 'https://leetcode.cn/problems/design-circular-queue/',
  difficulty: Difficulty.中等,
  tag: [Tag.设计, Tag.队列, Tag.数组, Tag.链表],
  desc: `设计你的循环队列实现。 `,
  solutions: [
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: 'queue',
      code: `struct MyCircularQueue {
    list: Vec<i32>,
    max: usize,
    head: usize,
    rear: usize,
}
impl MyCircularQueue {
    fn new(k: i32) -> Self {
        let max = (k + 1) as usize;
        let mut list = Vec::with_capacity(max);
        for _ in 0..max {
            list.push(0);
        }
        MyCircularQueue {
            max,
            list,
            head: 0,
            rear: 0,
        }
    }

    fn en_queue(&mut self, value: i32) -> bool {
        if self.is_full() {
            false
        } else {
            self.list[self.rear] = value;
            self.rear = (self.rear + 1) % self.max;
            true
        }
    }

    fn de_queue(&mut self) -> bool {
        if self.is_empty() {
            false
        } else {
            self.head = (self.head + 1) % self.max;
            true
        }
    }

    fn front(&self) -> i32 {
        if self.is_empty() {
            -1
        } else {
            *self.list.get(self.head).unwrap()
        }
    }

    fn rear(&self) -> i32 {
        if self.is_empty() {
            -1
        } else {
            let rear = if self.rear == 0 {
                self.max - 1
            } else {
                self.rear - 1
            };
            *self.list.get(rear).unwrap()
        }
    }

    fn is_empty(&self) -> bool {
        self.rear == self.head
    }

    fn is_full(&self) -> bool {
        (self.rear + 1) % self.max == self.head
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
