from preclude import *


class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        min1 = min2 = res = 0

        def refresh(row: int):
            nonlocal res
            nonlocal min1
            nonlocal min2
            res = min1 = min2 = inf
            for j in range(n):
                res = min(res, grid[row][j])
                if min1 == inf or grid[row][j] < grid[row][min1]:
                    min2 = min1
                    min1 = j
                elif min2 == inf or grid[row][j] < grid[row][min2]:
                    min2 = j
        for row in range(1, n):
            refresh(row-1)
            for j in range(n):
                grid[row][j] += grid[row -
                                     1][min2] if j == min1 else grid[row - 1][min1]
        refresh(n-1)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
