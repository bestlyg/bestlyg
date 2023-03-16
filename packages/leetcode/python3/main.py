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
    def countSubarrays(self, nums: List[int], k: int) -> int:
        m = Counter()
        res, cur, findK = 0, 0, False
        for num in nums:
            if num > k:
                cur += 1
            if num < k:
                cur -= 1
            if num == k:
                findK = True
            if findK:
                res += m[cur] + m[cur - 1] + (cur == 0 or cur == 1)
            else:
                m[cur] += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
