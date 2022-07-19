import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '731. 我的日程安排表 II',
  url: 'https://leetcode.cn/problems/my-calendar-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.设计, Tag.线段树,Tag.二分查找,Tag.有序集合],
  desc: `实现一个 MyCalendar 类来存放你的日程安排。如果要添加的时间内不会导致三重预订时，则可以存储这个新的日程安排。`,
  solutions: [
    {
      script: Script.RUST,
      time: 28,
      memory: 2.7,
      desc: '记录已经重叠的部分，每次遍历时判断新添加的是否和已重叠部分有冲突',
      code: `struct MyCalendarTwo {
    list: Vec<(i32, i32)>,
    overlap: Vec<(i32, i32)>,
}
impl MyCalendarTwo {
    fn new() -> Self {
        MyCalendarTwo {
            list: Vec::new(),
            overlap: Vec::new(),
        }
    }
    fn book(&mut self, start: i32, end: i32) -> bool {
        let block = (start, end);
        for item in &self.overlap {
            if self.is_overlap(&block, item) {
                return false;
            }
        }
        for item in &self.list {
            if self.is_overlap(&block, item) {
                self.overlap.push((block.0.max(item.0), block.1.min(item.1)));
            }
        }
        self.list.push(block);
        print!("{}", block.0);
        true
    }
    fn is_overlap(&self, v1: &(i32, i32), v2: &(i32, i32)) -> bool {
        v1.0 < v2.1 && v1.1 > v2.0
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
