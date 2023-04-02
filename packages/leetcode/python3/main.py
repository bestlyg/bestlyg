from sortedcontainers import SortedSet
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


def getPrimes(nmax: int):
    primes = [0] * nmax
    for i in range(2, nmax):
        if primes[i] == 0:
            primes[0] += 1
            primes[primes[0]] = i
        for j in range(1, nmax):
            if i * primes[j] >= nmax:
                break
            primes[i * primes[j]] = 1
            if i % primes[j] == 0:
                break
    return primes


class Solution:
    def minScoreTriangulation(self, values: List[int]) -> int:
        n = len(values)

        @cache
        def dfs(start: int, end: int):
            if start + 2 > end:
                return 0
            elif start + 2 == end:
                return values[start] + values[start + 1] + values[end]
            else:
                s = 0x7fffffff
                for i in range(start + 1, end):
                    s = min(s, values[start] * values[end] * values[i] + dfs(start, i) + dfs(i, end))
                return s
        return dfs(0, n-1)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
