import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1238. 循环码排列',
  url: 'https://leetcode.cn/problems/circular-permutation-in-binary-representation//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你两个整数 n 和 start。你的任务是返回任意 (0,1,2,,...,2^n-1) 的排列 p，并且满足：, p[0] = start, p[i] 和 p[i+1] 的二进制表示形式只有一位不同, p[0] 和 p[2^n -1] 的二进制表示形式也只有一位不同`,
  solutions: [
    {
      script: Script.CPP,
      time: 120,
      memory: 57,
      desc: 'dfs',
      code: `class Solution {
public:
    vector<int> circularPermutation(int n, int start) {
        vector<int> ans(pow(2, n));
        ans[0] = start;
        unordered_set<int> used;
        used.insert(start);
        dfs(ans, used, n, start, 1);
        return ans;
    }
    bool dfs(vector<int> &ans, unordered_set<int> &used, int n, int prev, int idx) {
        if (idx == pow(2, n)) {
            return compare(n, ans[0], ans[idx - 1]);
        }
        for (int i = 0; i < n; i++) {
            int v = prev & (1 << i), next = prev;
            if (v) next &= ~(1 << i);
            else next |= (1 << i); 
            if (used.count(next)) continue;
            used.insert(next);
            ans[idx] = next;
            if (dfs(ans, used, n, next, idx + 1)) return true;
            used.erase(next);
        }
        return false;
    }
    bool compare(int n, int num1, int num2) {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            int v1 = num1 & (1 << i), v2 = num2 & (1 << i);
            if (v1 != v2) cnt++;
        }
        return cnt == 1;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 372,
      memory: 106.3,
      desc: '同上',
      code: `class Solution:
        def circularPermutation(self, n: int, start: int) -> List[int]:
            ans = [0] * pow(2, n)
            ans[0] = start
            used = set()
            used.add(start)
    
            def compare(num1: int, num2: int) -> bool:
                cnt = 0
                for i in range(n):
                    v1 = num1 & (1 << i)
                    v2 = num2 & (1 << i)
                    if v1 != v2:
                        cnt += 1
                return cnt == 1
    
            def dfs(prev: int, idx: int) -> bool:
                if idx == pow(2, n):
                    return compare(ans[0], ans[-1])
                for i in range(n):
                    v = prev & (1 << i)
                    nextv = prev
                    if v:
                        nextv &= ~(1 << i)
                    else:
                        nextv |= (1 << i)
                    if nextv in used:
                        continue
                    used.add(nextv)
                    ans[idx] = nextv
                    if dfs(nextv, idx+1):
                        return True
                    used.remove(nextv)
                return False
            dfs(start, 1)
            return ans`,
    },
    {
      script: Script.RUST,
      time: 44,
      memory: 12.4,
      desc: '同上',
      code: `use std::collections::HashSet;
impl Solution {
    pub fn circular_permutation(n: i32, start: i32) -> Vec<i32> {
        let n = n as u32;
        let mut ans = vec![0; 2usize.pow(n)];
        ans[0] = start;
        let mut used = HashSet::<i32>::new();
        used.insert(start);
        Solution::dfs(&mut ans, &mut used, n, start, 1);
        ans
    }
    fn dfs(ans: &mut Vec<i32>, used: &mut HashSet<i32>, n: u32, prev: i32, idx: usize) -> bool {
        if idx == 2usize.pow(n) {
            Solution::compare(n, *ans.first().unwrap(), *ans.last().unwrap())
        } else {
            for i in 0..n {
                let v = prev & (1 << i);
                let mut next = prev;
                if v != 0 {
                    next &= !(1 << i);
                } else {
                    next |= 1 << i;
                }
                if used.contains(&next) {
                    continue;
                }
                used.insert(next);
                ans[idx] = next;
                if Solution::dfs(ans, used, n, next, idx + 1) {
                    return true;
                }
                used.remove(&next);
            }
            false
        }
    }
    fn compare(n: u32, num1: i32, num2: i32) -> bool {
        let mut cnt = 0;
        for i in 0..n {
            let v1 = num1 & (1 << i);
            let v2 = num2 & (1 << i);
            if v1 != v2 {
                cnt += 1;
            }
        }
        cnt == 1
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
