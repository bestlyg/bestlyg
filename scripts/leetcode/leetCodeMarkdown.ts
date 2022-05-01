import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1305. 两棵二叉搜索树中的所有元素',
  url: 'https://leetcode-cn.com/problems/construct-quad-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.数组, Tag.分治, Tag.矩阵],
  desc: `你需要返回能表示矩阵的 四叉树 的根结点。`,
  solutions: [
    {
      script: Script.GO,
      time: 84,
      memory: 8.4,
      desc: 'dfs',
      code: `func getAllElements(root1 *TreeNode, root2 *TreeNode) []int {
  arr1 := getArr(root1)
  n1 := len(arr1)
  arr2 := getArr(root2)
  n2 := len(arr2)
  ans := make([]int, n1+n2)
  var i1, i2 = 0, 0
  for i := 0; i1 < n1 || i2 < n2; i++ {
    if i1 != n1 && (i2 == n2 || arr1[i1] < arr2[i2]) {
      ans[i] = arr1[i1]
      i1++
    } else {
      ans[i] = arr2[i2]
      i2++
    }
  }
  return ans
}
func getArr(node *TreeNode) (arr []int) {
  var dfs func(*TreeNode)
  dfs = func(node *TreeNode) {
    if node == nil {
      return
    }
    dfs(node.Left)
    arr = append(arr, node.Val)
    dfs(node.Right)
  }
  dfs(node)
  return arr
}`,
    },
    {
      script: Script.GO,
      time: 196,
      memory: 56.4,
      desc: 'dfs',
      code: `int *getAllElements(struct TreeNode *root1, struct TreeNode *root2,
  int *returnSize) {
    int n1 = 0, n2 = 0;
    int *arr1 = (int *)malloc(sizeof(int) * 5005);
    int *arr2 = (int *)malloc(sizeof(int) * 5005);
    createArr(arr1, &n1, root1);
    createArr(arr2, &n2, root2);
    *returnSize = 0;
    int *ans = (int *)malloc(sizeof(int) * (n1 + n2));
    for (int i1 = 0, i2 = 0; i1 < n1 || i2 < n2;) {
        if (i1 != n1 && (i2 == n2 || arr1[i1] < arr2[i2]))
            ans[(*returnSize)++] = arr1[i1++];
        else
            ans[(*returnSize)++] = arr2[i2++];
    }
    free(arr1);
    free(arr2);
    return ans;
}
void createArr(int *arr, int *size, struct TreeNode *node) {
    if (node == NULL) return;
    createArr(arr, size, node->left);
    arr[(*size)++] = node->val;
    createArr(arr, size, node->right);
}`,
    },
  ],
};
export default leetCodeMarkdown;
