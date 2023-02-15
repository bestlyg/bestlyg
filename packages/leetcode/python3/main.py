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
    def isGoodArray(self, nums: List[int]) -> bool:
        def gcd(a, b):
            if not b:
                return a
            if a < b:
                return gcd(b, a)
            return gcd(b, a % b)
        res = nums[0]
        for num in nums:
            res = gcd(res, num)
            if res == 1:
                break
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
