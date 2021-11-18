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
    existMarkdown: !true,
    name: '563. 二叉树的坡度',
    url: 'https://leetcode-cn.com/problems/binary-tree-tilt/',
    difficulty: Difficulty.简单,
    tag: [Tag.树, Tag.深度优先搜索, Tag.二叉树],
    desc: `给定一个二叉树，计算 整个树 的坡度 。`,
    solutions: [
      {
        script: Script.TS,
        time: 112,
        memory: 44.3,
        desc: 'dfs',
        code: `function findTilt(root: TreeNode | null): number {
          return dfs(root).tilt;
          function dfs(node: TreeNode | null): {
            sum: number;
            tilt: number;
          } {
            const ans = { sum: 0, tilt: 0, res: 0 };
            if (node === null) return ans;
            const left = dfs(node.left);
            const right = dfs(node.right);
            ans.tilt = Math.abs(left.sum - right.sum) + left.tilt + right.tilt;
            ans.sum = node.val + left.sum + right.sum;
            return ans;
          }
        }`,
      },
    ],
  },
];
