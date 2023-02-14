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
    def longestWPI(self, hours: List[int]) -> int:
        n = len(hours)
        ans = 0
        sums = [0]
        for h in hours:
            v = -1
            if (h > 8):
                v = 1
            sums.append(sums[-1] + h)
        s = [0]
        for i in range(1, n+1):
            if sums[s[-1]] > sums[i]:
                s.append(i)
        for i in range(n, 0, -1):
            while len(s) and sums[s[-1]] < sums[i]:
                ans = max(ans, i - s.pop())
        return ans


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
