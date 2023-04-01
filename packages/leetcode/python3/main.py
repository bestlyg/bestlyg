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
    def maskPII(self, s: str) -> str:
        def isEmail(s: str):
            return s.find('@') != -1

        def formatEmail(s: str):
            res = ""
            res += s[0].lower + '*****'
            i = 0
            while s[i+1] != '@':
                i += 1
            while i < len(s):
                res += s[i].lower()
            return res

        def formatPhone(s: str):
            formats, res = "", ""
            for c in s:
                if c.isdigit():
                    formats += c
            pre = len(formats) - 10
            if pre == 1:
                res += "+*-"
            elif pre == 2:
                res += "+**-"
            elif pre == 3:
                res += "+***-"
            res += "***-***-" + formats[-4:]
        return formatEmail(s) if isEmail(s) else formatPhone(s)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
