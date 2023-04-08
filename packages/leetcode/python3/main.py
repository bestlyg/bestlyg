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


class Solution:
    def smallestSufficientTeam(self, req_skills: List[str], people: List[List[str]]) -> List[int]:
        n, m = len(req_skills), len(people)
        nmask = (1 << n) - 1
        keym = {}
        for i in range(n):
            keym[req_skills[i]] = i
        dp = [list() for _ in 1 << n]
        for i in range(m):
            mask = 0
            for key in people[i]:
                mask |= 1 << keym[key]
            for pmask in range(nmask + 1):
                merged = mask | pmask
                if merged == pmask or pmask and len(dp[pmask]) == 0 or len(dp[merged]) and len(dp[merged]) <= len(dp[pmask]) + 1:
                    continue
                dp[merged] = dp[pmask]
                dp[merged].append(i)
        return dp[nmask]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
