
from collections import Counter, defaultdict
from queue import Queue
from typing import List
from sortedcontainers import SortedList


class Solution:
    def minSideJumps(self, obstacles: List[int]) -> int:
        n = len(obstacles)
        dp = [[0x3f3f3f3f for _ in range(4)] for _ in range(n)]
        dp[0][2] = 0
        dp[0][1] = dp[0][3] = 1
        for i in range(1, n):
            if obstacles[i] != 1:
                dp[i][1] = dp[i - 1][1]
            if obstacles[i] != 2:
                dp[i][2] = dp[i - 1][2]
            if obstacles[i] != 3:
                dp[i][3] = dp[i - 1][3]
            if obstacles[i - 1] == 1:
                dp[i][1] = min(dp[i][2], dp[i][3]) + 1
            if obstacles[i - 1] == 2:
                dp[i][2] = min(dp[i][1], dp[i][3]) + 1
            if obstacles[i - 1] == 3:
                dp[i][3] = min(dp[i][1], dp[i][2]) + 1
        return min(dp[n - 1][1], dp[n - 1][2], dp[n - 1][3])


def main():
    o = Solution()
    res = o.minSideJumps([0, 0, 2, 0, 0, 0, 2, 1, 2, 0, 0])
    print(res)


main()
