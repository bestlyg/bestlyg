import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1376. 通知所有员工所需的时间',
  url: 'https://leetcode.cn/problems/time-needed-to-inform-all-employees/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回通知所有员工这一紧急消息所需要的 分钟数 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '遍历',
    //       code: `function sortPeople(names: string[], heights: number[]): string[] {
    //   return new Array(names.length)
    //     .fill(0)
    //     .map((_, i) => i)
    //     .sort((a, b) => heights[b] - heights[a])
    //     .map(i => names[i]);
    // }`,
    //       date: new Date('2022/09/25').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 248,
      memory: 119.4,
      desc: 'dfs',
      code: `class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> list(n);
        for (int i = 0; i < n; i++)
            if (manager[i] != -1) list[manager[i]].push_back(i);
        function<int(int)> dfs = [&](int cur) -> int {
            int sum = 0;
            for (auto &next : list[cur]) sum = max(sum, dfs(next));
            return informTime[cur] + sum;
        };
        return dfs(headID);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 392,
      memory: 43.5,
      desc: '同上',
      code: `class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        list = [[] for _ in range(n)]
        for i in range(n):
            if manager[i] != -1:
                list[manager[i]].append(i)

        def dfs(cur: int) -> int:
            sum = 0
            for next in list[cur]:
                sum = max(sum, dfs(next))
            return informTime[cur] + sum
        return dfs(headID)`,
    },
    {
      script: Script.RUST,
      time: 48,
      memory: 8.2,
      desc: '同上',
      code: `impl Solution {
pub fn num_of_minutes(n: i32, head_id: i32, manager: Vec<i32>, inform_time: Vec<i32>) -> i32 {
    let n = n as usize;
    let mut list = vec![vec![]; n];
    for i in 0..n {
        if manager[i] != -1 {
            list[manager[i] as usize].push(i);
        }
    }
    fn dfs(list: &Vec<Vec<usize>>, inform_time: &Vec<i32>, cur: usize) -> i32 {
        inform_time[cur]
            + list[cur]
                .iter()
                .map(|v| dfs(list, inform_time, *v))
                .max()
                .unwrap_or_default()
    }
    dfs(&list, &inform_time, head_id as usize)
}
}`,
    },
  ],
};

export default leetCodeMarkdown;
