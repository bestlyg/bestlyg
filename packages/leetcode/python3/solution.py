from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedList


class Solution:
    def canThreePartsEqualSum(self, arr: List[int]) -> bool:
        print(arr)
        n = len(arr)
        nsum = sum(arr)
        print(nsum)
        if nsum / 3 != nsum // 3:
            return False
        num = nsum // 3
        f: bool = False

        def dfs(i: int, frag: int):
            nonlocal f
            if i == n:
                if frag == 3:
                    f = True
                return
            vsum = 0
            for i in range(i, n):
                vsum += arr[i]
                if vsum == num:
                    dfs(i + 1, frag + 1)
        dfs(0, 0)
        return f
