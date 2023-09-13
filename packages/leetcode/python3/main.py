from math import floor, sqrt
from preclude import *

dirs = [(1, 2), (1, -2), (2, 1), (2, -1), (-1, 2), (-1, -2), (-2, 1), (-2, -1),]

class Solution:
    def checkValidGrid(self, grid: List[List[int]]) -> bool:
        n = len(grid)
        cur = (0, 0)
        for i in range(n * n):
            f = False
            for dir in dirs:
                x = cur[0] + dir[0]
                y = cur[1] + dir[1]
                if 0 <= x < n and 0 <= y < n and grid[x][y] == i + 1:
                    f = True
                    cur = (x, y)
            if not f:
                return False
        return True


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
