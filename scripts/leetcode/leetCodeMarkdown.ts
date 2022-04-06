import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '310. 最小高度树',
  url: 'https://leetcode-cn.com/problems/array-of-doubled-pairs/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.哈希表, Tag.排序],
  desc: `给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 172,
      memory: 77.7,
      desc: '从外向内遍历',
      code: `class Solution {
   public:
    struct node {
        int val, cnt;
        unordered_set<int> children;
    };
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        vector<node> list(n);
        for (int i = 0; i < n; i++) {
            list[i].val = i;
            list[i].cnt = 0;
        }
        for (auto& edge : edges) {
            int n0 = edge[0], n1 = edge[1];
            list[n0].children.insert(n1);
            list[n1].children.insert(n0);
            list[n0].cnt++;
            list[n1].cnt++;
        }
        queue<int> q;
        for (auto& node : list) {
            if (node.cnt == 1) q.push(node.val);
        }
        vector<int> ans;
        int size = q.size();
        while (q.size()) {
            int idx = q.front();
            ans.push_back(idx);
            q.pop();
            list[idx].cnt--;
            for (auto& child : list[idx].children) {
                if (--list[child].cnt != 1) continue;
                q.push(child);
            }
            if (--size == 0) {
                size = q.size();
                if (size) ans.clear();
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
