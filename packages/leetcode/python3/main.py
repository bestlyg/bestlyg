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

days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def comp(time: str) -> Tuple[int, int]:
    return (
        (ord(time[0]) - ord('0')) * 10 + (ord(time[1]) - ord('0')),
        (ord(time[3]) - ord('0')) * 10 + (ord(time[4]) - ord('0')),
    )


class Solution:
    def countDaysTogether(self, arriveAlice: str, leaveAlice: str, arriveBob: str, leaveBob: str) -> int:
        aS, aL, bS, bL = comp(arriveAlice), comp(
            leaveAlice), comp(arriveBob), comp(leaveBob)
        if aS[0] > bS[0] or aS[0] == bS[0] and aS[1] > bS[1]:
            temp = aS
            aS = bS
            bS = temp
            temp = aL
            aL = bL
            bL = temp
        if aL[0] < bS[0] or aL[0] == bS[0] and aL[1] < bS[1]:
            return 0
        start = bS
        end = bL if bL[0] < aL[0] or bL[0] == aL[0] and bL[1] < aL[1] else aL
        if start[0] == end[0]:
            return end[1] - start[1] + 1
        res = days[start[0]] - start[1] + 1 + end[1]
        for i in range(start[0] + 1, end[0]):
            res += days[i]
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
