import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6294. 最大价值和与最小价值和的差值',
  url: 'https://leetcode.cn/problems/difference-between-maximum-and-minimum-price-sum/',
  difficulty: Difficulty.困难,
  tag: [],
  desc: `请你返回所有节点作为根节点的选择中，最大 的 开销 为多少。`,
  solutions: [
    {
      script: Script.CPP,
      time: 360,
      memory: 191.3,
      desc: '',
      code: `class Solution {
public:
    typedef long long ll;
    typedef pair<ll, ll> pll;
    ll maxOutput(int n, vector<vector<int>>& edges, vector<int>& price) {
        vector<vector<int>> nodes(n);
        for (auto &e : edges) {
            nodes[e[0]].push_back(e[1]);
            nodes[e[1]].push_back(e[0]);
        }
        ll ans = 0;
        function<pll(int, int)> dfs = [&](int cur, int parent) -> pll {
            ll p = price[cur], max1 = p, max2 = 0;
            for (auto &child : nodes[cur]) {
                if (child == parent) continue;
                auto res = dfs(child, cur);
                ans = max(ans, max(max1 + res.second, max2 + res.first));
                max1 = max(max1, res.first + p);
                max2 = max(max2, res.second + p);
            }
            return make_pair(max1, max2);
        };
        dfs(0, -1);
        return ans;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 48,
      memory: 25.6,
      desc: '同上',
      code: `impl Solution {
    pub fn max_output(n: i32, edges: Vec<Vec<i32>>, price: Vec<i32>) -> i64 {
        let n = n as usize;
        let mut nodes: Vec<Vec<i32>> = vec![vec![]; n];
        for e in edges {
            nodes[e[0] as usize].push(e[1]);
            nodes[e[1] as usize].push(e[0]);
        }
        Solution::dfs(&nodes, &price, &mut 0, 0, -1).0
    }
    fn dfs(
        nodes: &Vec<Vec<i32>>,
        price: &Vec<i32>,
        ans: &mut i64,
        cur: i32,
        parent: i32,
    ) -> (i64, i64, i64) {
        let p = price[cur as usize] as i64;
        let mut max1 = p;
        let mut max2 = 0;
        for child in (*nodes)[cur as usize].iter() {
            if *child != parent {
                let (_, res_max1, res_max2) = Solution::dfs(nodes, price, ans, *child, cur);
                *ans = *ans.max(&mut (res_max1 + max2)).max(&mut (res_max2 + max1));
                max1 = max1.max(res_max1 + p);
                max2 = max2.max(res_max2 + p);
            }
        }
        (*ans, max1, max2)
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
