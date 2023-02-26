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
    def maxScoreWords(self, words: List[str], letters: List[str], score: List[int]) -> int:
        def toScore(word: str) -> int:
            res = 0
            for c in word:
                res += score[ord(c) - ord('a')]
            return res

        ans = 0
        n = len(words)
        clist = [0] * 26
        for c in letters:
            clist[ord(c) - ord('a')] += 1
        wscore = [toScore(w) for w in words]
        for i in range(1 << n):
            cclist = [clist[i] for i in range(26)]
            f = True
            s = 0
            for j in range(n):
                if i & (1 << j):
                    s += wscore[j]
                    for c in words[j]:
                        if cclist[ord(c) - ord('a')] == 0:
                            f = False
                            break
                        cclist[ord(c) - ord('a')] -= 1
                if f:
                    ans = max(ans, s)
        return ans


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
