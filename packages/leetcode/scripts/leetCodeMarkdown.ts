import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6318. 完成所有任务的最少时间',
  url: 'https://leetcode.cn/problems/minimum-time-to-complete-all-tasks////',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `你有一台电脑，它可以 同时 运行无数个任务。给你一个二维整数数组 tasks ，其中 tasks[i] = [starti, endi, durationi] 表示第 i 个任务需要在 闭区间 时间段 [starti, endi] 内运行 durationi 个整数时间点（但不需要连续）。当电脑需要运行任务时，你可以打开电脑，如果空闲时，你可以将电脑关闭。请你返回完成所有任务的情况下，电脑最少需要运行多少秒。`,
  solutions: [
    {
      script: Script.CPP,
      time: 152,
      memory: 37.3,
      desc: '按终止时间排序，对于每个任务先在时间段中找已经在运行的时间段，如果已经运行的时间段已经超过任务所需要的时间那不需要增加时间点，如果不满足，尽可能从后往前开启时间段。',
      code: `class Solution {
public:
    int findMinimumTime(vector<vector<int>>& tasks) {
        sort(tasks.begin(), tasks.end(), [&](auto &a, auto &b){
            return a[1] < b[1];
        });
        int res = 0, time[2005] = {0};
        for (auto &task : tasks) {
            for (int i = task[0]; i <= task[1]; i++)
                if (time[i]) task[2]--;
            if (task[2] <= 0) continue;
            for (int i = task[1]; i >= task[0] && task[2]; i--)
                if (!time[i]) time[i] = 1, res++, task[2]--;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 1072,
      memory: 15.9,
      desc: '同上',
      code: `class Solution:
    def findMinimumTime(self, tasks: List[List[int]]) -> int:
        tasks.sort(key=lambda item: item[1])
        res = 0
        time = [False]*2005
        for task in tasks:
            for i in range(task[0], task[1]+1):
                if time[i]:
                    task[2] -= 1
            if task[2] <= 0:
                continue
            for i in range(task[1], task[0]-1, -1):
                if not time[i]:
                    time[i] = True
                    res += 1
                    task[2] -= 1
                if not task[2]:
                    break
        return res`,
    },
    {
      script: Script.RUST,
      time: 40,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn find_minimum_time(tasks: Vec<Vec<i32>>) -> i32 {
        let mut tasks = tasks;
        tasks.sort_by(|a, b| a[1].cmp(&b[1]));
        let mut res = 0;
        let mut time = [false; 2005];
        for mut task in tasks {
            for i in task[0]..=task[1] {
                let i = i as usize;
                if time[i] {
                    task[2] -= 1;
                }
            }
            if task[2] > 0 {
                for i in (task[0]..=task[1]).rev() {
                    let i = i as usize;
                    if !time[i] {
                        time[i] = true;
                        res += 1;
                        task[2] -= 1;
                    }
                    if task[2] == 0 {
                        break;
                    }
                }
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
