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
    def printBin(self, num: float) -> str:
        res = "0."
        for i in range(1, 32):
            if num <= 0:
                break
            if num >= pow(2, -i):
                num -= pow(2, -i)
                res += "1"
            else:
                res += "0"
        return "ERROR" if num else res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
