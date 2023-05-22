from preclude import *


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
def dfs(node: Optional[TreeNode], limit: int, sum: int):
    if node == None:
        return True
    sum += node.val
    l, r = dfs(node.left, limit, sum), dfs(node.right, limit, sum)
    if (not node.left and not node.right and sum < limit) or (not node.left and not r) or (not node.right and not l) or (not l and not r):
        return False
    if not l:
        node.left = None
    if not r:
        node.right = None
    return True


class Solution:
    def sufficientSubset(self, root: Optional[TreeNode], limit: int) -> Optional[TreeNode]:
        return root if dfs(root, limit, 0) else None


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
