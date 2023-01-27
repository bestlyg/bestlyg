from collections import defaultdict
from typing import List
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedDict


class Solution:
    def waysToMakeFair(self, nums: List[int]) -> int:
        l = [0] * 2
        r = [0] * 2
        ans = 0
        for i, num in enumerate(nums):
            r[i % 2] += num
        for i, num in enumerate(nums):
            r[i % 2] -= num
            if l[0] + r[1] == l[1] + r[0]:
                ans += 1
            l[i % 2] += num
        return ans


def main():
    o = Solution()
    res = o.greatestLetter("arRAzFif")
    print(res)


main()
