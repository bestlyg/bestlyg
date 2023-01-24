from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def countPoints(self, points: List[List[int]], queries: List[List[int]]) -> List[int]:
        ans = [0] * len(queries)
        def d(a, b): return pow(abs(a[0] - b[0]), 2) + pow(abs(a[1] - b[1]), 2)
        for i in range(0, len(queries)):
            for p in points:
                if d(p, queries[i]) <= pow(queries[i][2], 2):
                    ans[i] += 1
        return ans
