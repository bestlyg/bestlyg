from math import floor, sqrt
from preclude import *


class Solution:
    def minCapability(self, nums: List[int], k: int) -> int:
        n = len(nums)

        def check(target: int) -> bool:
            cnt = 0
            prev = -1
            for i in range(n):
                if nums[i] <= target and (prev == -1 or prev + 1 != i):
                    prev = i
                    cnt += 1
            return cnt >= k

        l, r = min(nums), max(nums)
        while l < r:
            m = (l + r) // 2
            if check(m):
                r = m
            else:
                l = m + 1
        return l


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
