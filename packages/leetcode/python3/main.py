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
from math import inf, log2

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


def sort3(a: int, b: int, c: int) -> Tuple[int, int, int]:
    if a > c:
        a, c = c, a
    if a > b:
        a, b = b, a
    if b > c:
        b, c = c, b
    return (a, b, c)


class Solution:
    def countTime(self, time: str) -> int:
        time = list(time)
        def check(time: str) -> bool:
            h = (ord(time[0]) - ord('0')) * 10 + ord(time[1]) - ord('0')
            m = (ord(time[3]) - ord('0')) * 10 + ord(time[4]) - ord('0')
            return h < 24 and m < 60
        idxs = []
        for i in range(len(time)):
            if time[i] == '?':
                idxs.append(i)
        if len(idxs) == 0:
            return 1 if check(time) else 0
        res = 0

        def dfs(idx: int, time: str):
            if idx == len(idxs):
                if check(time):
                    res += 1
            else:
                for i in range(0, 10):
                    time[idxs[idx]] = chr(i + ord('0'))
                    dfs(idx+1, time)
        dfs(0, time)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
