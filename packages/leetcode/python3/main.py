from preclude import *


class Solution:
    def equalPairs(self, grid: List[List[int]]) -> int:
        rows = Counter()
        res = 0
        n = len(grid)
        for i in range(n):
            key = ""
            for j in range(n):
                key += grid[i][j] + ","
            rows[key] += 1
        for j in range(n):
            key = ""
            for i in range(n):
                key += grid[i][j] + ","
            res += rows[key]
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
