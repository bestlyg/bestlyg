from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def calculateTax(self, brackets: List[List[int]], income: int) -> float:
        ans = 0.0
        prev = 0
        for [k, v] in brackets:
            if prev > income:
                break
            ans += (min(income, k) - prev) * v / 100
            prev = k
        return ans