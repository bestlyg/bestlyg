from heapq import *
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
    def fillCups(self, amount: List[int]) -> int:
        amount = [-v for v in amount]
        heapify(amount)
        res = 0
        while len(amount) >= 2:
            num1, num2 = heappop(amount), heappop(amount)
            if num1 < -1:
                heappush(amount, num1+1)
            if num2 < -1:
                heappush(amount, num2+1)
            res += 1
        if len(amount):
            res += heappop(amount)
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
