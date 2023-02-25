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
    def minimumSwap(self, s1: str, s2: str) -> int:
        xcnt, ycnt = 0, 0
        ans = 0
        for a, b in zip(s1, s2):
            if a != b:
                if a == 'x':
                    xcnt += 1
                else:
                    ycnt += 1
        ans += xcnt // 2
        xcnt %= 2
        ans += ycnt // 2
        ycnt %= 2
        if xcnt and ycnt:
            ans += 2
            xcnt = 0
            ycnt = 0
        return -1 if xcnt or ycnt else ans


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
