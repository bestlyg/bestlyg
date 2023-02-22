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


class Node:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __lt__(self, o: 'Node') -> bool:
        v1 = 1.0 * (self.x + 1) / (self.y + 1) - 1.0 * self.x / self.y,
        v2 = 1.0 * (o.x + 1) / (o.y + 1) - 1.0 * o.x / o.y
        return v1 < v2


class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n, sumv = len(piles), 0
        dp = [[0] * (n + 1) for _ in range(n)]
        for i in range(n - 1, -1, -1):
            sumv += piles[i]
            for m in range(1, n + 1):
                if i + 2 * m >= n:
                    dp[i][m] = sumv
                else:
                    for x in range(1, 2*m+1):
                        dp[i][m] = max(dp[i][m], dp[i + x][max(x, m)])
        return dp[0][1]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
