from bisect import bisect_left
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
from math import inf

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


def gcd(a: int, b: int):
    if a < b:
        return gcd(b, a)
    if b == 0:
        return a
    return gcd(b, a % b)


def cmp(s1: str, s2: str, i1: int, i2: int, err: int):
    if i1 == s1.size():
        return i2 + err == s2.size()
    if i2 == s2.size():
        return i1 + err == s1.size()
    if s1[i1] == s2[i2]:
        return cmp(s1, s2, i1 + 1, i2 + 1, err)
    if err == 0:
        return False
    return cmp(s1, s2, i1 + 1, i2, err - 1) or cmp(s1, s2, i1, i2 + 1, err - 1)


class Solution:
    def longestStrChain(self, words: List[str]) -> int:
        words.sort(key=lambda v: len(v))
        n = len(words)
        res = 1
        dp = [1] * n
        for i in range(n):
            for j in range(i):
                if len(words[j]) == len(words[i]):
                    break
                if cmp(words[i], words[j]):
                    dp[i] = max(dp[i], dp[j] + 1)
            res = max(res, dp[i])
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
