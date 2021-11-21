import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: true,
    name: '559. N 叉树的最大深度',
    url: 'https://leetcode-cn.com/problems/longest-harmonious-subsequence/',
    difficulty: Difficulty.简单,
    tag: [Tag.数组, Tag.哈希表, Tag.排序],
    desc: `现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。`,
    solutions: [
      {
        script: Script.TS,
        time: 108,
        memory: 48.4,
        desc: 'dfs',
        code: `function maxDepth(root: Node | null): number {
          if (root === null) return 0;
          return Math.max(...root.children.map(node => maxDepth(node)),0) + 1;
        }`,
      },
      {
        script: Script.C,
        time: 4,
        memory: 6.9,
        desc: 'dfs',
        code: `int maxDepth(struct Node* root) {
    if (!root) return 0;
    int ans = 1;
    for (int i = 0; i < root->numChildren; i++) {
        int next_ans = maxDepth(root->children[i]) + 1;
        ans = next_ans > ans ? next_ans : ans;
    }
    return ans;
}`,
      },
    ],
  },
];
