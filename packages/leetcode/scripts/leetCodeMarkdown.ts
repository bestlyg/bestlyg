import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: 'LCP 50. 宝石补给',
    url: 'https://leetcode.cn/problems/WHnhjV',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在完成所有的赠送后，请找到拥有最多宝石的勇者和拥有最少宝石的勇者，并返回他们二者的宝石数量之差。`,
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
            time: 44,
            memory: 21.7,
            desc: '方向数组遍历',
            code: `class Solution {
public:
    int giveGem(vector<int>& gem, vector<vector<int>>& operations) {
        for (auto &item : operations) {
            gem[item[1]] += gem[item[0]] / 2;
            gem[item[0]] -= gem[item[0]] / 2;
        }
        return *max_element(gem.begin(), gem.end()) - *min_element(gem.begin(), gem.end());
    }
};`,
        },
        {
            script: Script.PY,
            time: 60,
            memory: 17.7,
            desc: '同上',
            code: `class Solution:
    def giveGem(self, gem: List[int], operations: List[List[int]]) -> int:
        for [i1, i2] in operations:
            gem[i2] += gem[i1] // 2
            gem[i1] -= gem[i1] // 2
        return max(gem) - min(gem)`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.3,
            desc: '同上',
            code: `impl Solution {
    pub fn give_gem(mut gem: Vec<i32>, operations: Vec<Vec<i32>>) -> i32 {
        for item in operations {
            gem[item[1] as usize] += gem[item[0] as usize] / 2;
            gem[item[0] as usize] -= gem[item[0] as usize] / 2;
        }
        *gem.iter().max() - *gem.iter().min()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
