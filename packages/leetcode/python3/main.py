from sortedcontainers import SortedSet
from functools import cache
from heapq import *
from collections import defaultdict
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


class Solution:
    def bestTeamScore(self, scores: List[int], ages: List[int]) -> int:
        n, res = len(scores), 0
        l = sorted(zip(ages, scores))
        dp = [0] * n
        for i in range(n):
            for j in range(i-1, -1, -1):
                if l[i][0] == l[j][0] or (l[i][0] > l[j][0] and l[i][1] >= l[j][1]):
                    dp[i] = max(dp[i], dp[j])
            dp[i] += l[i][1]
            res = max(res, dp[i])
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
