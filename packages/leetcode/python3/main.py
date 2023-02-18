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
    def findSolution(self, customfunction: 'CustomFunction', z: int) -> List[List[int]]
        res = []
        for x in range(1, 1001):
            l, r = 1, 1000
            while l <= r:
                m = (l + r)//2
                val = customfunction.f(x, m)
                if val == z:
                    res.append([x, m])
                    break
                if val > z:
                    r = m - 1
                else:
                    l = m + 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
