from sortedcontainers import SortedSet
from functools import cache
from heapq import *
from collections import defaultdict
from itertools import accumulate
from string import ascii_lowercase
from typing import List, Optional, Tuple
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict, SortedSet
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
    def checkArithmeticSubarrays(self, nums: List[int], l: List[int], r: List[int]) -> List[bool]:
        def check(i: int):
            left, right = l[i], r[i]
            size = right-left
            nmax, nmin = max(nums[left:right + 1]), min(nums[left:right+1])
            if (nmax - nmin) % size != 0:
                return False
            elif nmin == nmax:
                return True
            else:
                step = (nmax - nmin) // size
                arr = [False] * (size + 1)
                for i in range(left, right+1):
                    val = (nums[i] - nmin) // step
                    if (nums[i] - nmin) % step != 0 or arr[val]:
                        return False
                    else:
                        arr[val] = True
                return True
        return [check(i) for i in range(len(l))]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
