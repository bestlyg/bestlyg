from heapq import *
from collections import defaultdict
from itertools import accumulate
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


class Solution:
    def largest1BorderedSquare(self, grid: List[List[int]]) -> int:
        n, m, cnt = len(grid), len(grid[0]), 0
        MAX = 105
        cache = [[[0] * 4 for _ in range(MAX)] for _ in range(MAX)]
        for i in range(n):
            cnt = 0
            for j in range(m):
                cache[i][j][0] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
            cnt = 0
            for j in range(m - 1, -1, -1):
                cache[i][j][1] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
        for j in range(m):
            cnt = 0
            for i in range(n):
                cache[i][j][2] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
            cnt = 0
            for i in range(n - 1, -1, -1):
                cache[i][j][3] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
        cnt = 0
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 0:
                    continue
                cnt = max(cnt, 1)
                for k in range(1, min(cache[i][j][1], cache[i][j][3]) + 1):
                    if cache[i + k][j][1] >= k and cache[i][j + k][3] >= k:
                        cnt = max(cnt, pow(k + 1, 2))
        return cnt


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
