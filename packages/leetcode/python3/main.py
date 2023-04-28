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


class DinnerPlates:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.last = 0
        self.ss = [[]]
        self.used = set()
        self.q = []

    def get_last(self):
        if len(self.ss[self.last]) == self.capacity:
            last += 1
        if last == len(self.ss):
            self.ss.append([])
        return self.last

    def push(self, val: int) -> None:
        while len(self.q) and self.q[0] > self.last:
            heappop(self.q)
        if len(self.q) == 0:
            self.ss[self.get_last()].append(val)
        else:
            idx = self.q[0]
            self.ss[idx].append(val)
            if len(self.ss[idx]) == self.capacity:
                heappop(self.q)
                self.used.remove(idx)

    def pop(self) -> int:
        while self.last > 0 and len(self.ss[self.last]) == 0:
            self.last -= 1
        if self.last == 0 and len(self.ss[self.last]) == 0:
            return -1
        back = self.ss[self.last][-1]
        self.ss[self.last].pop()
        return back

    def popAtStack(self, index: int) -> int:
        if index > self.last or len(self.ss[index]) == 0:
            return -1
        back = self.ss[index][-1]
        self.ss[index].pop()
        if index not in self.used:
            heappush(self.q, index)
            self.used.add(index)
        return back


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
