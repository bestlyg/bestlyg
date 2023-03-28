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
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n1, n2 = len(str1), len(str2)
        dp = [[[] for _ in range(n2 + 1)] for _ in range(n1 + 1)]
        for i in range(n1):
            dp[i][0] = i
        for j in range(n2):
            dp[0][j] = j
        for i in range(1, n1+1):
            for j in range(1, n2+1):
                if str1[i - 1] == str2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + 1
        res = ""
        i, j = n1, n2
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                res += str1[i - 1]
                i -= 1
                j -= 1
            else:
                if dp[i - 1][j] < dp[i][j - 1]:
                    res += str1[i - 1]
                    i -= 1
                else:
                    res += str2[j - 1]
                    j -= 1
        res = res[::-1]
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
