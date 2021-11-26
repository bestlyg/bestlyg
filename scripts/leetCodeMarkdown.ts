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
    name: '700. 二叉搜索树中的搜索',
    url: 'https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/',
    difficulty: Difficulty.中等,
    tag: [Tag.哈希表, Tag.数学, Tag.字符串],
    desc: `给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。`,
    solutions: [
      {
        script: Script.TS,
        time: 108,
        memory: 44.7,
        desc: '递归',
        code: `function searchBST(root: TreeNode | null, val: number): TreeNode | null {
            if(root === null) return null;
            if(root.val === val) return root;
            if(root.val > val) return searchBST(root.left,val);
            else return searchBST(root.right,val)
      };`,
      },
      {
        script: Script.C,
        time: 28,
        memory: 14.9,
        desc: '递归',
        code: `struct TreeNode* searchBST(struct TreeNode* root, int val){
    if (!root) return NULL;
    if (root->val == val) return root;
    if (root->val > val) return searchBST(root->left, val);
    else return searchBST(root->right, val);
}`,
      },
    ],
  },
];
