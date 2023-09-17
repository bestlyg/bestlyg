from math import floor, sqrt
from preclude import *


class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[0, 0] for _ in range(n + 1)]
        dp[1][1] = nums[0]
        res = nums[0]
        for i in range(2, n + 1):
            dp[i][0] = max(dp[i - 1][0], dp[i - 2][0] + nums[i - 1])
            if i != n:
                dp[i][1] = max(dp[i - 1][1], dp[i - 2][1] + nums[i - 1])
            res = max(res, dp[i][0], dp[i][1])
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
