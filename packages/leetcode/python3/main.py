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
    def numberOfPairs(self, nums: List[int]) -> List[int]:
        l = [0] * 105
        res = [0] * 2
        for num in nums:
            l[num] ^= 1
            if l[num] == 0:
                res[0] += 1
        for i in range(105):
            res[1] += l[i]
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
