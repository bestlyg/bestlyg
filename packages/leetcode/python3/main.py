from collections import defaultdict
from typing import List, Optional
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict

# global
# nonlocal
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Node:
    def __init__(self) -> None:
        self.cnt = self.lcnt = self.rcnt = 0
        self.p = None


class Solution:
    def btreeGameWinningMove(self, root: Optional[TreeNode], n: int, x: int) -> bool:
        list = [Node() for _ in range(n + 1)]
        parent = -1

        def dfs(root: Optional[TreeNode], cur_parent: int) -> int:
            nonlocal parent
            if root == None:
                return 0
            if root.val == x:
                parent = cur_parent
            node = list[root.val]
            node.p = root
            node.lcnt = dfs(root.left, root.val)
            node.rcnt = dfs(root.right, root.val)
            node.cnt = node.lcnt + node.rcnt + 1
            return node.cnt

        dfs(root, -1)
        ans = False
        if parent != -1:
            ans |= list[root.val].cnt - list[x].cnt > list[x].cnt
        if list[x].p.left:
            ans |= list[root.val].cnt - \
                list[list[x].p.left.val].cnt < list[list[x].p.left.val].cnt
        if list[x].p.right:
            ans |= list[root.val].cnt - \
                list[list[x].p.right.val].cnt < list[list[x].p.right.val].cnt
        return ans


def main():
    o = Solution()
    res = o.shortestAlternatingPaths(
        5,
        [[0, 1], [1, 2], [2, 3], [3, 4]],
        [[1, 2], [2, 3], [3, 1]]

        # 3,
        # [[0, 1], [0, 2]],
        # [[1, 0]]
    )
    print(res)


main()
