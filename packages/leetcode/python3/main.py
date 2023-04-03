from functools import cache
from heapq import *
from collections import defaultdict, deque
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


class TrieNode:
    def __init__(self) -> None:
        self.end = False
        self.fail = None
        self.children: List[TrieNode] = [None] * 26


class Solution:
    def prevPermOpt1(self, arr: List[int]) -> List[int]:
        m = SortedDict()
        m[10005] = len(arr)
        for i in range(len(arr) - 1, -1, -1):
            idx = m.bisect_left(arr[i])
            if m.get(idx) != len(arr) and len(m) > 1:
                temp = arr[i]
                arr[i] = arr[m.get(idx - 1)]
                arr[m.get(idx - 1)] = temp
                break
            m[arr[i]] = i
        return arr


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
