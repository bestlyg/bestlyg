import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1041. 困于环中的机器人',
  url: 'https://leetcode.cn/problems/robot-bounded-in-circle/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `机器人按顺序执行指令 instructions，并一直重复它们。只有在平面中存在环使得机器人永远无法离开时，返回 true。否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6,
      desc: '做四次模拟回到原点的一定是循环',
      code: `class Solution {
public:
    bool isRobotBounded(string instructions) {
        vector<vector<int>> dirs = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
        int n = instructions.size(), dir = 0, x = 0, y = 0;
        for (int cnt = 0; cnt < 4; cnt++) {
            for (int i = 0; i < n; i++) {
                switch (instructions[i]) {
                    case 'L': dir = (dir + 4 - 1) % 4; break;
                    case 'R': dir = (dir + 1) % 4; break;
                    case 'G': x = x + dirs[dir][0], y = y + dirs[dir][1]; break;
                }
            }
        }
        return x == 0 && y == 0;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 32,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        x = y = dir = 0
        for _ in range(4):
            for i in instructions:
                match i:
                    case 'L':
                        dir = (dir + 4 - 1) % 4
                    case 'R':
                        dir = (dir + 1) % 4
                    case 'G':
                        x = x + dirs[dir][0]
                        y = y + dirs[dir][1]
        return x == 0 and y == 0`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `const dirs: [[i32; 2]; 4] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
impl Solution {
    pub fn is_robot_bounded(instructions: String) -> bool {
        let instructions = instructions.chars().collect::<Vec<char>>();
        let (mut x, mut y, mut dir) = (0, 0, 0i32);
        for _ in 0..4 {
            for i in &instructions {
                match *i {
                    'L' => {
                        dir = (dir + 4 - 1) % 4;
                    }
                    'R' => {
                        dir = (dir + 1) % 4;
                    }
                    'G' => {
                        x = x + dirs[dir as usize][0];
                        y = y + dirs[dir as usize][1];
                    }
                    _ => {}
                }
            }
        }
        x == 0 && y == 0
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
