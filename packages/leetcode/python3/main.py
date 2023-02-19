from functools import cache
from heapq import *
from collections import defaultdict
from itertools import accumulate
from string import ascii_lowercase
from typing import List, Optional, Tuple
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict
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


class Node:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __lt__(self, o: 'Node') -> bool:
        v1 = 1.0 * (self.x + 1) / (self.y + 1) - 1.0 * self.x / self.y,
        v2 = 1.0 * (o.x + 1) / (o.y + 1) - 1.0 * o.x / o.y
        return v1 < v2


class Solution:
    def findTheString(self, lcp: List[List[int]]) -> str:
        n = len(lcp)
        i = 0
        s = [''] * n
        for c in ascii_lowercase:
            while i < n and s[i] != '':
                i += 1
            if i == n:
                break
            for j in range(i, n):
                if lcp[i][j]:
                    s[i] = c
        if '' in s:
            return ''
        for i in range(n-1, -1, -1):
            for j in range(n-1, -1, -1):
                if s[i] == s[j]:
                    if i == n - 1 or j == n - 1:
                        if lcp[i][j] != 1:
                            return ''
                    elif lcp[i][j] != lcp[i+1][j+1]:
                        return ''
                elif lcp[i][j]:
                    return ''
        ''.join(s)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
