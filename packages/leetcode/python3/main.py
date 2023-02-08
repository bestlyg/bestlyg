from collections import defaultdict
from itertools import accumulate
from typing import List, Optional
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
    def __init__(self) -> None:
        self.end = False
        self.children = defaultdict(Node)


class Solution:
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        folder.sort()
        root = Node()
        ans = []
        for path in folder:
            nextNode = root
            l = path.split('/')
            for i in range(1, len(l)):
                nextNode = nextNode.children[l[i]]
                if nextNode.end:
                    break
            if not nextNode.end:
                ans.append(path)
            nextNode.end = True
        return ans


def main():
    o = Solution()
    res = o.shortestAlternatingPaths(
        [[0, 0, 0, 0, 0, 1],
         [1, 1, 0, 0, 1, 0],
         [0, 0, 0, 0, 1, 1],
         [0, 0, 1, 0, 1, 0],
         [0, 1, 1, 0, 0, 0],
         [0, 1, 1, 0, 0, 0]]
    )
    print(res)


main()
