import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1598. 文件夹操作日志搜集器',
  url: 'https://leetcode.cn/problems/crawler-log-folder/',
  difficulty: Difficulty.简单,
  tag: [Tag.栈, Tag.数组, Tag.字符串],
  desc: `执行完所有变更文件夹操作后，请你找出 返回主文件夹所需的最小步数 。`,
  solutions: [
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '[1, k+1, 2, k, 3, k-1..]排列',
      code: `impl Solution {
    pub fn min_operations(logs: Vec<String>) -> i32 {
        let mut ans = 0_i32;
        for log in logs {
            if log.eq("../") {
                ans = (ans - 1).max(0);
            } else if log.ne("./") {
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
