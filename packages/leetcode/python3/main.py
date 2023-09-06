from preclude import *

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def lcaDeepestLeaves(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def dfs(node: TreeNode, level: int) -> (int, TreeNode):
            res = (level, node)
            if node.left:
                res = dfs(node.left, node, level + 1)
            if node.right:
                right_result = dfs(node.right, node, level + 1)
                if right_result[0] > res[0]:
                    res = right_result
                elif right_result[0] == res[0]:
                    res = (res[0], node)
            return res

        return dfs(root, 0)[1]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
