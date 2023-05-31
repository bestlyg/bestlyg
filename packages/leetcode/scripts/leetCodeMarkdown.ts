import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1130. 叶值的最小代价生成树',
    url: 'https://leetcode.cn/problems/minimum-cost-tree-from-leaf-values/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。`,
    solutions: [
        //     {
        //       script: Script.TS,
        //       time: 76,
        //       memory: 45.3,
        //       desc: 'dfs',
        //       code: `// 特殊标识符，在左右相等时返回
        // }`,
        //     },
        {
            script: Script.CPP,
            time:48,
            memory: 11.6,
            desc: '树形dp，对一个区间去获取他的最大值和最小和',
            code: `#define pii pair<int, int>
#define X first
#define Y second
class Solution {
public:
    unordered_map<int, unordered_map<int, pii>> m;
    pii dfs(vector<int> &arr, int l, int r) {
        if (m[l].count(r)) return m[l][r];
        if (l == r) return m[l][r] = make_pair(arr[l], 0);
        pii res = make_pair(arr[r], INT_MAX);
        for (int i = l; i < r; i++) {
            res.X = max(res.X, arr[i]);
            auto left = dfs(arr, l, i), right = dfs(arr, i + 1, r);
            int sum = left.X * right.X + left.Y + right.Y;
            res.Y = min(res.Y, sum);
        }
        return m[l][r] = res;
    }
    int mctFromLeafValues(vector<int>& arr) {
        return dfs(arr, 0, arr.size() - 1).Y;
    }
};`,
        },
        {
            script: Script.PY3,
            time: 152,
            memory: 17.1,
            desc: '同上',
            code: `class Solution:
    def mctFromLeafValues(self, arr: List[int]) -> int:
        @cache
        def dfs(l: int, r: int) -> List[int]:
            if l == r: return [arr[l],0]
            res = [arr[r], inf]
            for i in range(l,r):
                res[0] = max(res[0], arr[i])
                left,right = dfs(l,i),dfs(i+1,r)
                sum = left[0] * right[0] + left[1] + right[1]
                res[1] = min(res[1], sum)
            return res
        return dfs(0, len(arr) - 1)[1]`,
        },
        {
            script: Script.RUST,
            time: 48,
            memory: 2,
            desc: '同上',
            code: `use std::collections::HashMap;
fn dfs(
    m: &mut HashMap<usize, HashMap<usize, (i32, i32)>>,
    arr: &Vec<i32>,
    l: usize,
    r: usize,
) -> (i32, i32) {
    if m.entry(l).or_insert(Default::default()).contains_key(&r) {
        *m.get(&l).unwrap().get(&r).unwrap()
    } else if l == r {
        let res = (arr[l], 0);
        (*m.get_mut(&l).unwrap()).insert(r, res);
        res
    } else {
        let mut res = (arr[r], i32::MAX);
        for i in l..r {
            res.0 = res.0.max(arr[i]);
            let (left, right) = (dfs(m, arr, l, i), dfs(m, arr, i + 1, r));
            let sum = left.0 * right.0 + left.1 + right.1;
            res.1 = res.1.min(sum);
        }
        (*m.get_mut(&l).unwrap()).insert(r, res);
        res
    }
}
impl Solution {
    pub fn mct_from_leaf_values(arr: Vec<i32>) -> i32 {
        let mut m = HashMap::<usize, HashMap<usize, (i32, i32)>>::new();
        dfs(&mut m, &arr, 0, arr.len() - 1).1
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
