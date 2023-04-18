from functools import cache
from heapq import *
from collections import defaultdict, deque
from itertools import accumulate
from string import ascii_lowercase
from typing import List, Optional, Tuple
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict, SortedSet
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


dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]


class Node:
    def __init__(self, row: int, col: int, time: int):
        self.row = row
        self.col = col
        self.time = time

    def __lt__(self, o: 'Node') -> bool:
        return self.time < o.time


class TrieNode:
    def __init__(self) -> None:
        self.end = False
        self.fail = None
        self.children: List[TrieNode] = [None] * 26


def check(num: int):
    if num == 1:
        return False
    i = 2
    while i * i <= num:
        if num % i == 0:
            return False
        i += 1
    return True


class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        def dfs(node: TreeNode) -> List[int]:
            res = [node.val, node.val, 0]
            if node.left != None:
                v = dfs(node.left)
                res[0] = min(res[0], v[0])
                res[1] = max(res[1], v[1])
                res[2] = max(res[2], max(
                    v[2], max(abs(res[0] - node.val), abs(res[1] - node.val))))
            if node.right != None:
                v = dfs(node.right)
                res[0] = min(res[0], v[0])
                res[1] = max(res[1], v[1])
                res[2] = max(res[2], max(
                    v[2], max(abs(res[0] - node.val), abs(res[1] - node.val))))
            return res
        return dfs(root)[2]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
