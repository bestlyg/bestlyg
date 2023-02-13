from heapq import *
from collections import defaultdict
from itertools import accumulate
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


class Solution:
    def balancedString(self, s: str) -> int:
        n = len(s)
        m = int(n/4)
        cnt = [0] * 4

        def getId(c: str) -> int:
            match c:
                case 'Q': return 0
                case 'W': return 1
                case 'E': return 2
                case 'R': return 3
            return -1

        def isBalance() -> bool:
            nonlocal m, cnt
            return cnt[0] <= m and cnt[1] <= m and cnt[2] <= m and cnt[3] <= m

        for c in s:
            cnt[getId(c)] += 1
        if isBalance():
            return 0
        ans = 0x3f3f3f3f
        l = 0
        for r in range(0, n):
            cnt[getId(s[r])] -= 1
            while l < r and isBalance():
                cnt[getId(s[l])] += 1
                if isBalance():
                    l += 1
                else:
                    cnt[getId(s[l])] -= 1
                    break
            if isBalance():
                ans = min(ans, r - l+1)
        return ans


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
