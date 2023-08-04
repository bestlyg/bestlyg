from preclude import *


class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        res = 0
        n = len(grid)
        m = len(grid[0])
        sum = n * m
        start = end = (0, 0)
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    start = (i, j)
                elif grid[i][j] == 2:
                    end = (i, j)
                elif grid[i][j] == -1:
                    sum -= 1
        used = [[False for _ in range(m)] for _ in range(n)]
        used[start[0]][start[1]] = False

        def dfs(cur: Tuple[int, int], cnt: int):
            if cur[0] == end[0] and cur[1] == end[1]:
                if cnt == sum:
                    res += 1
                return
            for dir in dirs:
                nx = cur[0] + dir[0]
                ny = cur[1] + dir[1]
                if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] != -1 and not used[nx][ny]:
                    used[nx][ny] = True
                    dfs((nx, ny), cnt + 1)
                    used[nx][ny] = False
        dfs(start, 1)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
