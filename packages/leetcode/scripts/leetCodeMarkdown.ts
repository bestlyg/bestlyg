import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2682. 找出转圈游戏输家',
    url: 'https://leetcode.cn/problems/find-the-losers-of-the-circular-game/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你参与游戏的朋友数量 n 和一个整数 k ，请按升序排列返回包含所有输家编号的数组 answer 作为答案。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 8,
            memory: 13.16,
            desc: '模拟',
            code: `class Solution {
public:
    vector<int> circularGameLosers(int n, int k) {
        int list[50] = {0}, cur = 0;
        list[cur] += 1;
        for (int i = 1; ; i++) {
            cur = (cur + i * k) % n;
            list[cur] += 1;
            if (list[cur] > 1) break;
        }
        vector<int> res;
        for (int i = 0; i < n; i++) {
            if (list[i] == 0) res.push_back(i + 1);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 72,
            memory: 15.46,
            desc: '同上',
            code: `class Solution:
    def circularGameLosers(self, n: int, k: int) -> List[int]:
        list = [0 for _ in range(n)]
        cur = 0
        list[cur] += 1
        i = 1
        while True:
            cur = (cur + i * k) % n
            list[cur] += 1
            i += 1
            if list[cur] > 1:
                break
        res = []
        for i in range(n):
            if list[i] == 0:
                res.append(i + 1)
        return res`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 1.88,
            desc: '同上',
            code: `impl Solution {
    pub fn circular_game_losers(n: i32, k: i32) -> Vec<i32> {
        let n = n as usize;
        let k = k as usize;
        let mut list = vec![0; n];
        let mut cur = 0;
        list[cur] += 1;
        for i in 1.. {
            cur = (cur + i * k) % n;
            list[cur] += 1;
            if list[cur] > 1 {
                break;
            }
        }
        (0..n)
            .collect::<Vec<_>>()
            .into_iter()
            .filter(|i| list[*i] == 0)
            .map(|v| (v + 1) as i32)
            .collect()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
