from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from sortedcontainers import SortedDict

class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        list=[]
        n = len(weights)
        for i in range(1, n):
            list.append(weights[i - 1] + weights[i])
        list.sort()
        return sum(list[len(list) - k - 1:]) - sum(list[:k])
        


def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)


main()
