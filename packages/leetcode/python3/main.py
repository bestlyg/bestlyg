from collections import defaultdict
from itertools import accumulate
from typing import List, Optional
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict
import heapq
import math

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


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def dfs(self, root: Optional[TreeNode]) -> bool:
        if node.val == 0: return False
        if node.val == 1: return True
        if node.left and node.val == 2: return dfs(node.left) or dfs(node.right)
        if node.left and node.val == 3: return dfs(node.left) and dfs(node.right)
        return False
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        return self.dfs(root)


def main():
    o = Solution()
    res = o.shortestAlternatingPaths(
        [[0, 0, 0, 0, 0, 1],
         [1, 1, 0, 0, 1, 0],
         [0, 0, 0, 0, 1, 1],
         [0, 0, 1, 0, 1, 0],
         [0, 1, 1, 0, 0, 0],
         [0, 1, 1, 0, 0, 0]]
    )
    print(res)


main()
