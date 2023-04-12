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


def check(num: int):
    if num == 1:
        return False
    i = 2
    while i * i <= num:
        if num % i == 0:
            return False
        i += 1
    return True


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def longestDecomposition(self, text: str) -> int:
        n = len(text)
        res = 0

        def check(i1: int, i2: int, size: int) -> bool:
            while size:
                if text[i1] != text[i2]:
                    return False
                i1 += 1
                i2 += 1
                size -= 1
            return True
        i = 0
        while i <= n // 2:
            f = False
            cnt = 1
            while i + cnt <= n - i:
                if check(i, n - i - cnt, cnt):
                    f = True
                    if i == n - i - cnt:
                        res += 1
                    else:
                        res += 2
                    i += cnt-1
                    break
                cnt += 1
            if not f:
                if (n - 2 * i) / 2 != 0:
                    res += 1
                break
            i += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
