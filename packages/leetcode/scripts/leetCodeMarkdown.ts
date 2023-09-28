import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2251. 花期内花的数目',
    url: 'https://leetcode.cn/problems/number-of-flowers-in-full-bloom',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个大小为 n 的整数数组 answer ，其中 answer[i]是第 i 个人到达时在花期内花的 数目 。`,
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
            time: 240,
            memory: 82.55,
            desc: '排序后遍历，差分数组记录当前值',
            code: `class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        vector<pair<int, int>> flist;
        for (auto &item : flowers) {
            flist.push_back(make_pair(item[0], 1));
            flist.push_back(make_pair(item[1] + 1, -1));
        }
        sort(flist.begin(), flist.end(), [&](auto &a, auto &b) {
            return a.first < b.first;
        });
        vector<int> plist;
        for (int i = 0; i < people.size(); i++) plist.push_back(i);
        sort(plist.begin(), plist.end(), [&](auto &a, auto &b) {
            return people[a] < people[b];
        });
        int pidx = 0, cur = 0;
        vector<int> res(people.size(), 0);
        for (auto &item : flist) {
            while (pidx < plist.size() && people[plist[pidx]] < item.first) {
                res[plist[pidx]] = cur;
                pidx += 1;
            }
            cur += item.second;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 228,
            memory: 40.3,
            desc: '同上',
            code: `class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        flist = []
        for [start, end] in flowers:
            flist.append((start, 1))
            flist.append((end + 1, -1))
        flist.sort()
        plist = [i for i in range(len(people))]
        plist.sort(key = lambda i: people[i])
        pidx = 0
        res = [0 for _ in range(len(people))]
        cur = 0
        for (idx, d) in flist:
            while pidx < len(plist) and people[plist[pidx]] < idx:
                res[plist[pidx]] = cur
                pidx += 1
            cur += d
        return res
`,
        },
        {
            script: Script.RUST,
            time: 48,
            memory: 6.7,
            desc: '同上',
            code: `impl Solution {
    pub fn full_bloom_flowers(flowers: Vec<Vec<i32>>, people: Vec<i32>) -> Vec<i32> {
        let mut flist = vec![];
        for item in flowers {
            flist.push((item[0], 1));
            flist.push((item[1] + 1, -1));
        }
        flist.sort_by_cached_key(|o| o.0);
        let mut plist = (0..people.len()).collect::<Vec<usize>>();
        plist.sort_by_cached_key(|i| people[*i]);
        let mut res = vec![0; people.len()];
        let mut pidx = 0;
        let mut cur = 0;
        for (idx, d) in flist {
            while pidx < plist.len() && people[plist[pidx]] < idx {
                res[plist[pidx]] = cur;
                pidx += 1;
            }
            cur += d;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
