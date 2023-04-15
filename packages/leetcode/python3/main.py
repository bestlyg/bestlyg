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


def check(num: int):
    if num == 1:
        return False
    i = 2
    while i * i <= num:
        if num % i == 0:
            return False
        i += 1
    return True


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def gardenNoAdj(self, n: int, paths: List[List[int]]) -> List[int]:
        list = [[] for _ in range(n)]
        for [p1, p2] in paths:
            list[p1-1].append(p2-1)
            list[p2-1].append(p1-1)
        res = [0] * n
        for i in range(n):
            cache = [False] * 5
            for next in list[i]:
                if res[next] != 0:
                    cache[res[next]] = 1
            for j in range(5):
                if cache[j] != 1:
                    res[i] = j
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
