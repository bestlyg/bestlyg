import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1815. 得到新鲜甜甜圈的最多组数',
  url: 'https://leetcode.cn/problems/maximum-number-of-groups-getting-fresh-donuts/',
  difficulty: Difficulty.困难,
  tag: [Tag.位运算, Tag.记忆化搜索, Tag.数组, Tag.动态规划, Tag.状态压缩],
  desc: `你可以随意安排每批顾客到来的顺序。请你返回在此前提下，最多 有多少组人会感到开心。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 8.1,
      desc: '先统计1个组无余数，2个组组合无余数，剩下的记忆化搜索',
      code: `class Solution {
public:
    unordered_map<int, int> cache;
    int maxHappyGroups(int batchSize, vector<int>& groups) {
        map<int, int> m;
        int sum = 0;
        for (int i = 0; i < groups.size(); i++) {
            int num = groups[i] % batchSize;
            if (num == 0) sum++;
            else if (m[batchSize - num]) m[batchSize - num]--, sum++;
            else m[num]++;
        }
        return sum + dfs(m, batchSize, 0);
    }
    int dfs(map<int, int> &m, int batchSize, int surplus) {
        int cachek = trans(m);
        if (cache[cachek]) return cache[cachek];
        int res = 0;
        for (auto &item : m) {
            if (item.second == 0) continue;
            item.second--;
            res = max(res, (surplus == 0) + dfs(m, batchSize, (batchSize - item.first + surplus) % batchSize));
            item.second++;
        }
        return cache[cachek] = res;
    }
    int trans(map<int, int> &m) {
        int ans = 0, i = 0;
        for (auto &item : m) ans |= item.second << (4 * i++);
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 64,
      memory: 15.8,
      desc: '同上',
      code: `from sortedcontainers import SortedDict
class Solution:
    def maxHappyGroups(self, batchSize: int, groups: List[int]) -> int:
        cache = defaultdict()
        m = SortedDict()
        nsum = 0
        for group in groups:
            num = group % batchSize
            if num == 0:
                nsum += 1
            elif (batchSize - num) in m and m[batchSize - num] > 0:
                m[batchSize - num] -= 1
                nsum += 1
            else:
                item = m.setdefault(num, 0)
                m[num] = item + 1
        def trans(m: SortedDict):
            ans = 0
            i = 0
            for item in m.values():
                ans |= item << (4 * i)
                i += 1
            return ans
        def dfs(m: SortedDict, surplus: int):
            cachek = trans(m)
            if cachek in cache:
                return cache[cachek]
            res = 0
            for k in m.keys():
                if m[k] == 0:
                    continue
                m[k] -= 1
                res = max(res, (surplus == 0) +
                          dfs(m, (batchSize - k + surplus) % batchSize))
                m[k] += 1
            cache[cachek] = res
            return res
        return nsum + dfs(m, 0)`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `use std::collections::{BTreeMap, HashMap};
impl Solution {
    pub fn max_happy_groups(batch_size: i32, groups: Vec<i32>) -> i32 {
        let mut m = BTreeMap::<i32, i32>::new();
        let mut sum = 0;
        for group in groups {
            let num = group % batch_size;
            if num == 0 {
                sum += 1;
            } else if m.contains_key(&(batch_size - num)) && m[&(batch_size - num)] > 0 {
                let item = m.get_mut(&(batch_size - num)).unwrap();
                *item -= 1;
                sum += 1;
            } else {
                let item = m.entry(num).or_insert(0);
                *item += 1;
            }
        }
        let mut cache = HashMap::<i32, i32>::new();
        sum + Solution::dfs(m, &mut cache, batch_size, 0)
    }
    fn trans(m: &BTreeMap<i32, i32>) -> i32 {
        let mut ans = 0;
        let mut i = 0;
        for (_, v) in m.iter() {
            ans |= v << (4 * i);
            i += 1;
        }
        ans
    }
    fn dfs(
        m: BTreeMap<i32, i32>,
        cache: &mut HashMap<i32, i32>,
        batch_size: i32,
        surplus: i32,
    ) -> i32 {
        let cachek = Solution::trans(&m);
        if cache.contains_key(&cachek) {
            *cache.get(&cachek).unwrap()
        } else {
            let mut res = 0;
            for (k, v) in m.iter() {
                if *v != 0 {
                    let mut next_m = m.clone();
                    *next_m.get_mut(k).unwrap() -= 1;
                    res = res.max(
                        i32::from(surplus == 0)
                            + Solution::dfs(
                                next_m,
                                cache,
                                batch_size,
                                (batch_size - *k + surplus) % batch_size,
                            ),
                    );
                }
            }
            cache.insert(cachek, res);
            res
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
