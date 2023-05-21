import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: 'LCP 33. 蓄水',
  url: 'https://leetcode.cn/problems/o8SXZn/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `每个水缸对应最低蓄水量记作 vat[i]，返回小扣至少需要多少次操作可以完成所有水缸蓄水要求。`,
  solutions: [
    //         {
    //           script: Script.TS,
    //           time: 76,
    //           memory:45.5,
    //           desc: '利用余数为0判断是否产生分割',
    //           code: `function chunk(arr: any[], size: number): any[][] {
    //     const res: any[][] = [];
    //     const item: any[] = [];
    //     for (let i = 1; i <= arr.length; i++) {
    //         item.push(arr[i - 1]);
    //         if (i % size === 0) res.push([...item]), (item.length = 0);
    //     }
    //     if (item.length) res.push([...item]);
    //     return res;
    // }`,
    //         },
    {
      script: Script.CPP,
      time: 84,
      memory: 8,
      desc: '利用堆获取需要次数最多的桶',
      code: `class Solution {
public:
    int storeWater(vector<int>& bucket, vector<int>& vat) {
        auto get_cnt = [&](int idx) {
            if (bucket[idx] == 0) {
                if (vat[idx] == 0) return 0;
                return 0x3f3f3f3f;
            }
            return (int)ceil(1.0 * vat[idx] / bucket[idx]);
        };
        auto cmp = [&](int x, int y) -> bool { 
            return get_cnt(x) < get_cnt(y);
        };
        priority_queue<int, vector<int>, decltype(cmp)> q(cmp);
        for (int i = 0; i < bucket.size(); i++) q.push(i);
        int res = get_cnt(q.top()), add = 0;
        while (get_cnt(q.top()) > 1) {
            int cur_cnt = get_cnt(q.top());
            while (get_cnt(q.top()) == cur_cnt) {
                int idx = q.top();
                q.pop();
                do {
                    bucket[idx] += 1;
                    add += 1;
                } while(get_cnt(idx) == cur_cnt);
                q.push(idx);
            }
            res = min(res, get_cnt(q.top()) + add);
        }
        return res;
    }
};`,
    },
    // {
    //   script: Script.PY3,
    //   time: 304,
    //   memory: 65.5,
    //   desc: '同上',
    //   code: ``,
    // },
    // {
    //   script: Script.RUST,
    //   time: 24,
    //   memory: 9.8,
    //   desc: '同上',
    //   code: ``,
    // },
  ],
};

export default leetCodeMarkdown;
