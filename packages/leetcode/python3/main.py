from sortedcontainers import SortedSet
from functools import cache
from heapq import *
from collections import defaultdict
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


class Solution:
    def findLexSmallestString(self, s: str, a: int, b: int) -> str:
        set = SortedSet()
        set.add(s)
        q = Queue()
        q.put(s)

        def t1(s: str):
            res = ""
            for i in range(len(s)):
                if i % 2:
                    res += str((ord(s[i]) - ord('0') + a) % 10)
                else:
                    res += s[i]
            return res

        def t2(s: str):
            return s[len(s)-b:] + s[0:len(s)-b]
        while q.qsize():
            cur = q.get()
            n1, n2 = t1(cur), t2(cur)
            if not n1 in set:
                set.add(n1)
                q.put(n1)
            if not n2 in set:
                set.add(n2)
                q.put(n2)
        return set.pop(0)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
