import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2106. 摘水果',
  url: 'https://leetcode.cn/problems/maximum-fruits-harvested-after-at-most-k-steps/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回你可以摘到水果的 最大总数 。`,
  solutions: [
//     {
//       script: Script.TS,
//       time: 184,
//       memory: 48.3,
//       desc: '遍历',
//       code: `function isValid(s: string): boolean {
//     while (s != "") {
//         const n = s.replace("abc", "");
//         if (n == s) return false;
//         s = n;
//     }
//     return s == "";
// };`,
//     },
    {
      script: Script.CPP,
      time: 388,
      memory: 163.4,
      desc: '每向左走到一个水果点，对右侧进行二分查找最大能走到的水果点',
      code: `class Solution {
public:
    int maxTotalFruits(vector<vector<int>>& fruits, int startPos, int k) {
        int res = 0;
        vector<vector<int>> l, r;
        r.push_back(vector<int>{ -1, 0});
        for (auto &item : fruits) {
            item[0] -= startPos;
            if (item[0] < 0) item[0] = -item[0], l.push_back(item);
            else if (item[0] > 0) r.push_back(item);
            else res += item[1];
        }
        l.push_back(vector<int>{ -1, 0});
        reverse(l.begin(), l.end());
        l.push_back(vector<int>{ INT_MAX, 0});
        r.push_back(vector<int>{ INT_MAX, 0});
        vector<int> sumL(1, 0), sumR(1, 0);
        for (auto &item : l) sumL.push_back(sumL.back() + item[1]);
        for (auto &item : r) sumR.push_back(sumR.back() + item[1]);
        return res + max(f(l, sumL, r, sumR, k), f(r, sumR, l, sumL, k));
    }
    int f(vector<vector<int>> &left, vector<int> &sumL, vector<vector<int>> &right, vector<int> &sumR, int k) {
        int res = sumR[bs(right, k)];
        for (int i = 1; i < left.size() && left[i][0] <= k; i++)
            res = max(res, sumL[i + 1] + sumR[bs(right, k - left[i][0] * 2)]);
        return res;
    }
    int bs(vector<vector<int>> &list, int target) {
        if (target <= 0) return 0;
        int l = 0, r = list.size();
        while (l < r) {
            int m = (l + r) / 2;
            if (list[m][0] > target) r = m;
            else l = m + 1;
        }
        return l;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 476,
      memory: 50.9,
      desc: '同上',
      code: `class Solution:
    def maxTotalFruits(self, fruits: List[List[int]], startPos: int, k: int) -> int:
        res = 0
        l, r = [], []
        r.append([-1, 0])
        for item in fruits:
            item[0] -= startPos
            if item[0] < 0:
                item[0] = -item[0]
                l.append(item)
            elif item[0] > 0:
                r.append(item)
            else:
                res += item[1]
        l.append([-1, 0])
        l.reverse()
        l.append([inf, 0])
        r.append([inf, 0])

        sumL, sumR = [0], [0]
        for item in l:
            sumL.append(sumL[-1] + item[1])
        for item in r:
            sumR.append(sumR[-1] + item[1])

        def f(left: List[List[int]], sumL: List[int], right: List[List[int]], sumR: List[int], k: int):
            res = sumR[bs(right, k)]
            for i in range(1, len(left)):
                if left[i][0] > k:
                    break
                res = max(res, sumL[i + 1] +
                        sumR[bs(right, k - left[i][0] * 2)])
            return res

        def bs(list: List[List[int]], target: int):
            if target <= 0:
                return 0
            l = 0
            r = len(list)
            while l < r:
                m = (l + r) // 2
                if list[m][0] > target:
                    r = m
                else:
                    l = m + 1
            return l

        return res + max(f(l, sumL, r, sumR, k), f(r, sumR, l, sumL, k))`,
    },
    {
      script: Script.RUST,
      time: 44,
      memory: 11.5,
      desc: '同上',
      code: `impl Solution {
    pub fn max_total_fruits(fruits: Vec<Vec<i32>>, start_pos: i32, k: i32) -> i32 {
        let mut res = 0;
        let mut l: Vec<Vec<i32>> = vec![];
        let mut r: Vec<Vec<i32>> = vec![];
        r.push(vec![-1, 0]);
        for mut item in fruits {
            item[0] -= start_pos;
            if item[0] < 0 {
                item[0] = -item[0];
                l.push(item);
            } else if item[0] > 0 {
                r.push(item);
            } else {
                res += item[1]
            }
        }
        l.push(vec![-1, 0]);
        l.reverse();
        l.push(vec![i32::MAX, 0]);
        r.push(vec![i32::MAX, 0]);
        let mut suml = vec![0];
        let mut sumr = vec![0];
        for item in &l {
            suml.push(*suml.last().unwrap() + item[1]);
        }
        for item in &r {
            sumr.push(*sumr.last().unwrap() + item[1]);
        }
        res + std::cmp::max(f(&l, &suml, &r, &sumr, k), f(&r, &sumr, &l, &suml, k))
    }
    }

    fn f(left: &Vec<Vec<i32>>, suml: &Vec<i32>, right: &Vec<Vec<i32>>, sumr: &Vec<i32>, k: i32) -> i32 {
    let mut res = sumr[bs(right, k)];
    for i in 1..left.len() {
        if left[i][0] > k {
            break;
        }
        res = res.max(suml[i + 1] + sumr[bs(right, k - left[i][0] * 2)]);
    }
    res
    }
    fn bs(list: &Vec<Vec<i32>>, target: i32) -> usize {
    if target <= 0 {
        0
    } else {
        let mut l = 0;
        let mut r = list.len();
        while l < r {
            let m = (l + r) / 2;
            if list[m][0] > target {
                r = m;
            } else {
                l = m + 1;
            }
        }
        l
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
