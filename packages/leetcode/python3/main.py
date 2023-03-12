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
    def countSubgraphsForEachDiameter(self, n: int, edges: List[List[int]]) -> List[int]:
        nodes = [[] for _ in range(n)]
        for n1, n2 in edges:
            nodes[n1-1].append(n2-1)
            nodes[n2-1].append(n1-1)

        def dfs(root: int, mask: int):
            if mask == 0:
                return 0
            res = 0
            for nextNode in nodes[root]:
                if mask & (1 << nextNode):
                    resd = dfs(nextNode, mask & ~(1 << nextNode))
                    if resd != -1:
                        res = max(res, resd+1)
            return res
        res = [0] * (n-1)
        for i in range(1, 1 << n):
            root, mask, last = 0, i, 0
            while ((1 << root) & 1) == 0:
                root += 1
            q = Queue()
            q.put(root)
            mask &= ~(1 << root)
            while q.qsize():
                cur = q.get()
                last = cur
                for nextNode in nodes[cur]:
                    if mask & (1 << nextNode):
                        mask &= ~(1 << nextNode)
                        q.put(nextNode)
            if mask == 0:
                d = dfs(last, i & ~(1 << last))
                if d >= 1:
                    res[d-1] += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
