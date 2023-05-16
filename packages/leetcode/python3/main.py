from preclude import *


class Node:
    def __init__(self, k: int, v: int):
        self.k = k
        self.v = v

    def __lt__(self, o: 'Node') -> bool:
        return self.v < o.v


class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d:
            return -1
        num = 0
        dp = [[inf for _ in range(n)] for _ in range(d)]
        for i in range(n):
            dp[0][i] = num = max(num, jobDifficulty[i])
        for dd in range(1, d):
            for i in range(dd, n):
                num = 0
                for j in range(i, dd - 1, -1):
                    num = max(num, jobDifficulty[j])
                    dp[dd][i] = min(dp[dd][i], dp[dd - 1][j - 1] + num)
        return dp[d - 1][n - 1]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
