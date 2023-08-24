from preclude import *


class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        n = len(grid)
        m = len(grid[0])
        mmap = [[0 for _ in range(m)] for _ in range(n)]
        prev = (-1, -1)
        for i in range(n):
            prev = (-1, -1)
            for j in range(m):
                if grid[i][j] == 1:
                    if prev[0] == -1:
                        prev = (i, j)
                    else:
                        mmap[prev[0]][prev[1]] = True
                        mmap[i][j] = True
        for j in range(m):
            prev = (-1, -1)
            for i in range(n):
                if grid[i][j] == 1:
                    if prev[0] == -1:
                        prev = (i, j)
                    else:
                        mmap[prev[0]][prev[1]] = True
                        mmap[i][j] = True
        res = 0
        for i in range(n):
            for j in range(m):
                if mmap[i][j]:
                    res += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
