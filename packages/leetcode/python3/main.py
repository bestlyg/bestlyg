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
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        n = len(coins)
        list = [[] for _ in range(n)]
        cnts = [0] * n
        for edge in edge:
            list[edge[0]].append(edge[1])
            list[edge[1]].append(edge[0])
            cnts[edge[0]] += 1
            cnts[edge[1]] += 1
        cur_edges = n - 1
        q = deque()
        for i in range(n):
            if cnts[i] == 1 and coins[i] == 0:
                q.append(i)
        while len(q):
            idx = q.popleft
            cur_edges -= 1
            for ne in list[idx]:
                cnts[ne] -= 1
                if cnts[ne] == 1 and coins[ne] == 0:
                    q.append(ne)
        for i in range(n):
            if cnts[i] == 1 and coins[i] == 1:
                q.append(i)
        cur_edges -= len(q)
        while len(q):
            idx = q.popleft()
            for ne in list[idx]:
                cnts[ne] -= 1
                if cnts[ne] == 1:
                    cnts[ne] -= 1
                    cur_edges -= 1
        return max(cur_edges * 2, 0)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
