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

    def checkSingal(self, expression: str):
        if expression[0] != '{' or expression[-1] != '}':
            return False
        level, i = 0, 0
        while i < len(expression):
            if expression[i] == '{':
                level += 1
            elif expression[i] == '}':
                level -= 1
            if i != len(expression) - 1 and level == 0:
                return False
            i += 1
        return True

    def split(self, expression: str):
        items = []
        level = prev = i = 0
        while i < len(expression):
            if expression[i] == '{':
                level += 1
            elif expression[i] == '}':
                level -= 1
            elif expression[i] == ',' and level == 0:
                items.append(expression[prev:i])
                prev = i + 1
            i += 1
        items.append(expression[prev:])
        return items

    def analysis(self, item: str):
        res = []
        i = 0
        while i < len(item):
            if item[i] != '{':
                res.append([str(item[i])])
            else:
                prev, level = i, 0
                while True:
                    if item[i] == '{':
                        level += 1
                    elif item[i] == '}':
                        level -= 1
                    if level == 0:
                        break
                    else:
                        i += 1
                res.append(self.braceExpansionII(item[prev:i+1]))
            i += 1
        return res

    def dfs(self, s: SortedSet, res: List[List[str]], start: int, cur: str):
        if start == len(res):
            s.add(cur)
        else:
            for i in range(len(res[start])):
                self.dfs(s, res, start+1, cur+res[start][i])

    def braceExpansionII(self, expression: str) -> List[str]:
        s = SortedSet()
        if self.checkSingal(expression):
            expression = expression[1:-1]
        items = self.split(expression)
        if len(items) > 1:
            for item in items:
                for res in self.braceExpansionII(item):
                    s.add(res)
        else:
            item = items[0]
            res = self.analysis(item)
            self.dfs(s, res, 0, '')
        return list(s)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
