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


class Node:
    def __init__(self) -> None:
        self.end = False
        self.children = defaultdict(Node)


class Solution:
    def dieSimulator(self, n: int, rollMax: List[int]) -> int:
        mod = 10 ** 9 + 7
        dp = [[([0] * 16) for _ in range(6)] for _ in range(n + 1)]
        for j in range(6):
            dp[1][j][1] = 1
        for i in range(1, n + 1):
            for j in range(6):
                for k in range(1, rollMax[j] + 1):
                    for p in range(6):
                        if p != j:
                            dp[i][p][1] = (dp[i][p][1] + dp[i - 1][j][k]) % mod
                        elif k + 1 <= rollMax[j]:
                            dp[i][p][k + 1] = (dp[i][p]
                                               [k + 1] + dp[i-1][j][k]) % mod
        res = 0
        for i in range(6):
            for j in range(1, rollMax[i] + 1):
                res = (res + dp[n][i][j]) % mod
        return res


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
