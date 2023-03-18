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
    def checkPalindromeFormation(self, a: str, b: str) -> bool:
        def check(s: str):
            l, r = 0, len(s)-1
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        n, cnt = len(a), 0
        while cnt < n and a[cnt] == b[n-1-cnt]:
            cnt += 1
        if cnt >= n//2 or check(a[cnt:n-cnt]) or check(b[cnt:n-cnt]):
            return True
        cnt = 0
        while cnt < n and b[cnt] == a[n-1-cnt]:
            cnt += 1
        if cnt >= n//2 or check(a[cnt:n-cnt]) or check(b[cnt:n-cnt]):
            return True
        return False


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
