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


dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]


class Node:
    def __init__(self, row: int, col: int, time: int):
        self.row = row
        self.col = col
        self.time = time

    def __lt__(self, o: 'Node') -> bool:
        return self.time < o.time


class Solution:
    def movesToMakeZigzag(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return 0

        def try1():
            res = 0
            for i in range(1, n, 2):
                p = nums[i-1]
                if i+1 < n:
                    p = min(p, nums[i+1])
                if nums[i] >= p:
                    res += nums[i] - p + 1
            return res

        def try2():
            res = 0
            if nums[0] >= nums[1]:
                res += nums[0] - nums[1] + 1
            for i in range(2, n, 2):
                p = nums[i - 1]
                if i + 1 < n:
                    p = min(p, nums[i + 1])
                if nums[i] >= p:
                    res += nums[i] - p + 1
            return res
        return min(try1(), try2())


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
