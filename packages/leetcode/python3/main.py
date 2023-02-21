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
    def minTaps(self, n: int, ranges: List[int]) -> int:
        l = [-1] * (n + 1)
        for i in range(len(ranges)):
            start = max(i - ranges[i], 0)
            end = min(i + ranges[i], n)
            l[start] = max(l[start], end)
        cnt = prev = last = 0
        for i in range(n):
            last = max(last, l[i])
            if last == i:
                return -1
            if i == prev:
                prev = last
                cnt += 1
        return cnt


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
