from preclude import *


class Solution:
    def connectTwoGroups(self, cost: List[List[int]]) -> int:
        n = len(cost)
        m = len(cost[0])
        cache = [[inf for _ in range(1 << m)] for _ in range(n + 1)]
        cache[0][0] = 0
        for i in range(1, n+1):
            for mask in range(1 << m):
                for j in range(m):
                    if mask & (1 << j):
                        cache[i][mask] = min(
                            cache[i][mask], cache[i][mask & ~(1 << j)] + cost[i - 1][j])
                        cache[i][mask] = min(
                            cache[i][mask], cache[i - 1][mask] + cost[i - 1][j])
                        cache[i][mask] = min(
                            cache[i][mask], cache[i - 1][mask & ~(1 << j)] + cost[i - 1][j])
        return cache[n][(1 << m) - 1]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
