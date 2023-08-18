from preclude import *


class Solution:
    def maxSizeSlices(self, slices: List[int]) -> int:
        m = len(slices) // 3

        def check(nums: List[int]) -> int:
            n = len(nums)
            dp = [[0 for _ in range(m + 1)] for _ in range(n + 1)]
            for i in range(1, n+1):
                for j in range(1, m+1):
                    dp[i][j] = max(dp[i-1][j], nums[i-1])
                    if i >= 2:
                        dp[i][j] = max(dp[i][j], dp[i-2][j-1]+nums[i-1])
            return dp[n][m]
        return max(check(slices[1:m]), check(slices[0:m-1]))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
