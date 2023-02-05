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


class Solution:
    def minCost(self, basket1: List[int], basket2: List[int]) -> int:
        m = Counter()
        for num1, num2 in zip(basket1, basket2):
            m[num1] += 1
            m[num2] -= 1
        nmin = min(m)
        l = []
        for k, v in m.items():
            if v % 2 == 0:
                return -1
            for _ in range(abs(v) / 2):
                l.append(k)
        l.sort()
        ans = 0
        for i in range(len(l) / 2):
            ans += min(list[i], nmin * 2)
        return ans


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
