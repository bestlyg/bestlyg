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


class AuthenticationManager:
    def __init__(self, timeToLive: int):
        self.timeToLive = timeToLive
        self.m = defaultdict()

    def generate(self, tokenId: str, currentTime: int) -> None:
        self.m[tokenId] = currentTime

    def renew(self, tokenId: str, currentTime: int) -> None:
        if not tokenId in self.m:
            return
        if currentTime - self.m[tokenId] >= self.timeToLive:
            self.m.pop(tokenId)
        else:
            self.m[tokenId] = currentTime

    def countUnexpiredTokens(self, currentTime: int) -> int:
        ans = 0
        for v in self.m.values():
            if currentTime - v < self.timeToLive:
                ans += 1
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
