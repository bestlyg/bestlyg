import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1450. 在既定时间做作业的学生人数',
  url: 'https://leetcode.cn/problems/number-of-students-doing-homework-at-a-given-time/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `请返回在查询时间 queryTime 时正在做作业的学生人数。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '遍历',
      code: `impl Solution {
    pub fn busy_student(start_time: Vec<i32>, end_time: Vec<i32>, query_time: i32) -> i32 {
        let mut ans = 0;
        for i in 0..start_time.len() {
            if start_time[i] <= query_time && end_time[i] >= query_time {
                ans += 1;
            }
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
