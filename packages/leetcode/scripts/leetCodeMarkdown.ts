import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '228. 汇总区间',
    url: 'https://leetcode.cn/problems/count-good-nodes-in-binary-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一棵根为 root 的二叉树，请你返回二叉树中好节点的数目。`,
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
            time: 0,
            memory: 6.65,
            desc: '遍历',
            code: `class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        if (nums.size() == 0) return res;
        bool prev = false;
        pair<int, int> cur;
        for (auto &num : nums) {
            if (!prev) {
                prev = true;
                cur = make_pair(num, num);
            } else if (cur.second + 1 == num) {
                cur.second = num;
            } else {
                string item = cur.first == cur.second ? to_string(cur.first) : to_string(cur.first) + "->" + to_string(cur.second);
                res.push_back(item);
                cur = make_pair(num, num);
            }
        }
        if (prev) {
            string item = cur.first == cur.second ? to_string(cur.first) : to_string(cur.first) + "->" + to_string(cur.second);
            res.push_back(item);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 48,
            memory: 15.72,
            desc: '同上',
            code: `class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        if not len(nums):
            return []
        res = []
        prev = False
        cur = (0, 0)
        for num in nums:
            if not prev:
                prev = True
                cur = (num, num)
            elif cur[1] + 1 == num:
                cur = (cur[0], num)
            else:
                item = str(cur[0]) if cur[0] == cur[1] else str(cur[0]) + "->" + str(cur[1])
                res.append(item)
                cur = (num, num)
        if prev:
            item = str(cur[0]) if cur[0] == cur[1] else str(
                cur[0]) + "->" + str(cur[1])
            res.append(item)
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.13,
            desc: '同上',
            code: `impl Solution {
    pub fn summary_ranges(nums: Vec<i32>) -> Vec<String> {
        let mut res = vec![];
        if !nums.is_empty() {
            let mut prev = false;
            let mut cur = (0, 0);
            for num in nums {
                if !prev {
                    prev = true;
                    cur = (num, num);
                } else if cur.1 + 1 == num {
                    cur.1 = num;
                } else {
                    let item = if cur.0 == cur.1 {
                        cur.0.to_string()
                    } else {
                        let mut s = String::new();
                        s.push_str(&cur.0.to_string());
                        s.push_str("->");
                        s.push_str(&cur.1.to_string());
                        s
                    };
                    res.push(item);
                    cur = (num, num);
                }
            }
            if prev {
                let item = if cur.0 == cur.1 {
                        cur.0.to_string()
                } else {
                    let mut s = String::new();
                    s.push_str(&cur.0.to_string());
                    s.push_str("->");
                    s.push_str(&cur.1.to_string());
                    s
                };
                res.push(item);
            }
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
