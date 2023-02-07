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


class Solution:
    def alertNames(self, keyName: List[str], keyTime: List[str]) -> List[str]:
        m = defaultdict(list)
        for i in range(len(keyName)):
            time = (ord(keyTime[i][0]) * 10 + ord(keyTime[i][1])) * \
                60 + ord(keyTime[i][3]) * 10 + ord(keyTime[i][4])
            m[keyName[i]].append(time)
        ans = []
        for k, v in m.items():
            v.sort()
            for i in range(2, len(v)):
                if v[i] - v[i - 2] <= 60:
                    ans.append(k)
        ans.sort()
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
