from functools import cache
from heapq import *
from collections import defaultdict
from itertools import accumulate
from string import ascii_lowercase
from typing import List, Optional, Tuple
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


dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]

class Node:
    def __init__(self, row: int, col: int, time: int):
        self.row = row
        self.col = col
        self.time = time

    def __lt__(self, o: 'Node') -> bool:
        return self.time < o.time

class Solution:
    def minimumTime(self, grid: List[List[int]]) -> int:
        n, m = len(grid), len(grid[0])
        if grid[0][1] > 1 and grid[1][0] > 1:
            return -1
        q = []
        heappush(q, Node(0, 0, 0))
        cache = [[0] * 1005 for _ in range(1005)]
        cache[0][0] = 1
        while True:
            cur: Node = heappop(q)
            if cur.row == n - 1 and cur.col == m - 1:
                return cur.time
            for (i, j) in dirs:
                nrow = cur.row + i
                ncol = cur.col + j
                if 0 <= nrow < n and 0 <= ncol < m:
                    time = cur.time + 1
                    if grid[nrow][ncol] > time:
                        minus = (grid[nrow][ncol] - time + 1) // 2
                        time = cur.time + minus * 2 + 1
                    if cache[nrow][ncol]:
                        continue
                    cache[nrow][ncol] = 1
                    heappush(q, Node(nrow, ncol, time))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
