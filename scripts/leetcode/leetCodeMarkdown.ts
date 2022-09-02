import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '687. 最长同值路径',
  url: 'https://leetcode.cn/problems/longest-univalue-path/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索, Tag.二叉树],
  desc: `给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。`,
  solutions: [
    {
      script: Script.CPP,
      time: 84,
      memory: 49.9,
      desc: '递归,每次记录以根结点起的最长链路和子节点的最长内部链路',
      code: `#define MAX(a, b) ((a) > (b) ? (a) : (b))
int longestUnivaluePath(struct TreeNode *root){
    if (!root) return 0;
    int ans = 0;
    _longestUnivaluePath(root, &ans);
    return ans - 1;
}
int _longestUnivaluePath(struct TreeNode *root, int *ans) {
    if (!root) return 0;
    int cnt1 = 1, cnt2 = 1,
        left = _longestUnivaluePath(root->left, ans),
        right = _longestUnivaluePath(root->right, ans);
    if (root->left && root->left->val == root->val) cnt1 = MAX(cnt1, 1 + left), cnt2 += left;
    if (root->right && root->right->val == root->val) cnt1 = MAX(cnt1, 1 + right), cnt2 += right;
    *ans = MAX(*ans, cnt1);
    *ans = MAX(*ans, cnt2);
    return cnt1;
}`,
    },
  ],
};
export default leetCodeMarkdown;
