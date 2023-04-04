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


class Solution:
    def mergeStones(self, stones: List[int], k: int) -> int:
        n = len(stones)
        if (n - k) % (k - 1) != 0:
            return -1
        dp = [[-1] * n for _ in range(n)]
        sums = [0]
        for s in stones:
            sums.append(sums[-1] + s)

        @cache
        def dfs(start: int, end: int) -> int:
            if start == end:
                return 0
            res = 0x7fffffff
            for m in range(start, end, k-1):
                res = min(res, dfs(start, m) + dfs(m + 1, end))
            if (end - start) % (k - 1) == 0:
                res += sums[end + 1] - sums[start]
            return res
        return dfs(0, n-1)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
