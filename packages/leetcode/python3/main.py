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
    def numDupDigitsAtMostN(self, n: int) -> int:
        sn = str(n)

        @cache
        def dfs(idx: int, mask: int, limit: bool, empty: bool):
            if idx == len(sn):
                return 0 if empty else 1
            res = 0
            if empty:
                res += dfs(idx+1, mask, False, True)
            nmax = int(sn[idx]) if limit else 9
            for j in range(1 if empty else 0, nmax+1):
                if (mask & (1 << j)) == 0:
                    res += dfs(idx+1, mask | (1 << j),
                               limit and j == nmax, False)
            return res
        return n - dfs(0, 0, True, True)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
