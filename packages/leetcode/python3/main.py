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
    def numMovesStonesII(self, stones: List[int]) -> List[int]:
        n = len(stones)
        stones.sort()
        if stones[n - 1] - stones[0] + 1 == n:
            return [0, 0]
        nmin, nmax = 0x7fffffff, max(
            stones[n - 1] - stones[1] - 1 - (n - 3), stones[n - 2] - stones[0] - 1 - (n - 3))
        l = r = ec = 0
        while r < n:
            while r + 1 < n and n - (r - l + 1) > ec:
                ec += stones[r + 1] - stones[r] - 1
                r += 1
            if r + 1 == n and n - (r - l + 1) > ec:
                break
            cnt = n - (r - l + 1)
            lc = ec - cnt
            if cnt == 0 and lc:
                nmin = min(nmin, lc)
            elif lc == 0:
                nmin = min(nmin, cnt)
            elif lc == 1:
                nmin = min(nmin, cnt + 2)
            else:
                nmin = min(nmin, cnt + 1)
            ec -= stones[l + 1] - stones[l] - 1
            l += 1
        return [nmin, nmax]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
