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
    def minimumScore(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        pre, suf = [] * n, [m] * (n + 1)
        i, p = 0, 0
        while i < n and p < m:
            if s[i] == t[p]:
                p += 1
            pre[i] = p
            i += 1
        i, p = n-1, m-1
        while i >= 0 and p >= 0:
            if s[i] == t[p]:
                p -= 1
            suf[i] = p+1
            i -= 1
        res = suf[0]
        for i in range(n):
            if suf[i + 1] < pre[i]:
                return 0
            res = min(res, suf[i + 1] - pre[i])
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
