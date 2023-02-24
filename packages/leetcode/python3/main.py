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


class Node:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __lt__(self, o: 'Node') -> bool:
        v1 = 1.0 * (self.x + 1) / (self.y + 1) - 1.0 * self.x / self.y,
        v2 = 1.0 * (o.x + 1) / (o.y + 1) - 1.0 * o.x / o.y
        return v1 < v2

class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        return len(set(nums) | {0})


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
