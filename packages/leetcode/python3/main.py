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
    def isRobotBounded(self, instructions: str) -> bool:
        dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        x = y = dir = 0
        for _ in range(4):
            for i in instructions:
                match i:
                    case 'L':
                        dir = (dir + 4 - 1) % 4
                        break
                    case 'R':
                        dir = (dir + 1) % 4
                        break
                    case 'G':
                        x = x + dirs[dir][0]
                        y = y + dirs[dir][1]
                        break
        return x == 0 and y == 0


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
