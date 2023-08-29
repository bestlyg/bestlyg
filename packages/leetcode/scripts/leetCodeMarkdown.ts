import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '823. 带因子的二叉树',
    url: 'https://leetcode.cn/problems/binary-trees-with-factors/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给出一个含有不重复整数元素的数组 arr ，每个整数 arr[i] 均大于 1。用这些整数来构建二叉树，每个整数可以使用任意次数。其中：每个非叶结点的值应等于它的两个子结点的值的乘积。满足条件的二叉树一共有多少个？`,
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
            script: Script.PY,
            time: 312,
            memory: 16.79,
            desc: 'dfs',
            code: `class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        MOD = 1000000007
        arr.sort()
        s = set()
        for num in arr:
            s.add(num)
        @cache
        def dfs(root: int) -> int:
            res = 1
            for num in arr:
                if num >= root: break
                if root % num != 0: continue
                if root // num not in s: continue
                res = (res + dfs(num) * dfs(root // num) % MOD) % MOD
            return res
        return sum(dfs(num) for num in arr) % MOD`,
        },
        {
            script: Script.CPP,
            time: 52,
            memory: 8.66,
            desc: '遍历',
            code: `class Solution {
public:
    int numFactoredBinaryTrees(vector<int>& arr) {
        int MOD = 1e9 + 7, n = arr.size(), res = 1;
        sort(arr.begin(), arr.end());
        unordered_map<int, int> m;
        for (int i = 0; i < n; i++) m[arr[i]] = i;
        vector<long long> list(n, 1);
        for (int i = 1; i < n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (arr[i] % arr[j] == 0 && m.count(arr[i] / arr[j])) {
                    list[i] = (list[i] + list[j] * list[m[arr[i] / arr[j]]] % MOD) % MOD;
                }
            }
            res = (res + list[i]) % MOD;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 384,
            memory: 15.91,
            desc: '同上',
            code: `class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        MOD = 1000000007
        n = len(arr)
        res = 1
        arr.sort()
        m = {}
        for i in range(n):
            m[arr[i]] = i
        list = [1 for _ in range(n)]
        for i in range(1, n):
            for j in range(i-1, -1, -1):
                if arr[i] % arr[j] == 0 and arr[i] // arr[j] in m:
                    list[i] = (list[i] + list[j] *
                                list[m[arr[i] / arr[j]]] % MOD) % MOD
            res = (res + list[i]) % MOD
        return res`,
        },
        {
            script: Script.RUST,
            time: 20,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn num_factored_binary_trees(mut arr: Vec<i32>) -> i32 {
        const MOD: i64 = 1000000007;
        let n = arr.len();
        let mut res = 1;
        arr.sort();
        let mut m = std::collections::HashMap::<i32, usize>::new();
        for (i, num) in arr.iter().enumerate() {
            m.insert(*num, i);
        }
        let mut list = vec![1i64; n];
        for i in 1..n {
            for j in (0..i).rev() {
                if arr[i] % arr[j] == 0 && m.contains_key(&(arr[i] / arr[j])) {
                    let idx = m.get(&(arr[i] / arr[j])).unwrap();
                    list[i] = (list[i] + list[j] * list[*idx] % MOD) % MOD;
                }
            }
            res = (res + list[i]) % MOD;
        }
        res as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
