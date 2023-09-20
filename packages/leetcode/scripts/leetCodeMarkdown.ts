import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: 'LCP 06. 拿硬币',
    url: 'https://leetcode.cn/problems/na-ying-bi',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。`,
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
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 4,
            memory: 8.17,
            desc: '遍历',
            code: `class Solution {
public:
    int minCount(vector<int>& coins) {
        int res = 0;
        for (auto &coin : coins) res += ceil(1.0 * coin / 2);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 40,
            memory: 16,
            desc: '同上',
            code: `class Solution:
    def minCount(self, coins: List[int]) -> int:
        return sum(ceil(coin / 2) for coin in coins)`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.3,
            desc: '同上',
            code: `impl Solution {
    pub fn min_count(coins: Vec<i32>) -> i32 {
        coins
            .into_iter()
            .map(|coin| (coin as f64 / 2.0).ceil() as i32)
            .sum()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
