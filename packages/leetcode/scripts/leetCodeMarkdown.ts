import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '771. 宝石与石头',
    url: 'https://leetcode.cn/problems/jewels-and-stones/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 0,
            memory: 6.1,
            desc: '遍历',
            code: `class Solution {
public:
    int numJewelsInStones(string jewels, string stones) {
        bool list[200] = {0};
        for (auto &o : jewels) list[o] = true;
        int sum = 0;
        for (auto &c : stones) {
            if (list[c]) sum++;
        }
        return sum;
    }
};`,
        },
        {
            script: Script.PY,
            time: 36,
            memory: 16,
            desc: '同上',
            code: `class Solution:
    def numJewelsInStones(self, jewels: str, stones: str) -> int:
        s = set(jewels)
        return sum(o in s for o in stones)`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.9,
            desc: '同上',
            code: `impl Solution {
    pub fn num_jewels_in_stones(jewels: String, stones: String) -> i32 {
        let mut list = [false; 200];
        for c in jewels.bytes() {
            list[c as usize] = true;
        }
        stones
            .bytes()
            .into_iter()
            .filter(|c| list[*c as usize])
            .collect::<Vec<_>>()
            .len() as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
