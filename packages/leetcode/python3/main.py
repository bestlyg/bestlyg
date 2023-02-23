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
    def circularPermutation(self, n: int, start: int) -> List[int]:
        ans = [0] * pow(2, n)
        ans[0] = start
        used = set()
        used.add(start)

        def compare(num1: int, num2: int) -> bool:
            cnt = 0
            for i in range(n):
                v1 = num1 & (1 << i)
                v2 = num2 & (1 << i)
                if v1 != v2:
                    cnt += 1
            return cnt == 1

        def dfs(prev: int, idx: int) -> bool:
            if idx == pow(2, n):
                return compare(ans[0], ans[-1])
            for i in range(n):
                v = prev & (1 << i)
                nextv = prev
                if v:
                    nextv &= ~(1 << i)
                else:
                    nextv |= (1 << i)
                if nextv in used:
                    continue
                used.add(nextv)
                ans[idx] = nextv
                if dfs(nextv, idx+1):
                    return True
                used.remove(nextv)
            return False
        dfs(start, 1)
        return ans


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
