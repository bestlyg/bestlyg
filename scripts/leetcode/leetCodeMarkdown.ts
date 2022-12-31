import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2037. 使每位学生都有座位的最少移动次数',
  url: 'https://leetcode.cn/problems/minimum-number-of-moves-to-seat-everyone/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序],
  desc: `请你返回使所有学生都有座位坐的 最少移动次数 ，并确保没有两位学生的座位相同。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 17.5,
      desc: '遍历',
      code: `class Solution {
public:
    int minMovesToSeat(vector<int>& seats, vector<int>& students) {
        sort(seats.begin(), seats.end());
        sort(students.begin(), students.end());
        int ans = 0;
        for (int i = 0; i < seats.size(); i++) ans += abs(seats[i] - students[i]);
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '遍历',
      code: `impl Solution {
    pub fn min_moves_to_seat(seats: Vec<i32>, students: Vec<i32>) -> i32 {
        let mut seats = seats;
        let mut students = students;
        seats.sort();
        students.sort();
        let mut ans = 0;
        for i in 0..seats.len() {
            ans += (seats[i] - students[i]).abs();
        }
        ans
    }
}`,
    },
  ],
};
export default leetCodeMarkdown;
