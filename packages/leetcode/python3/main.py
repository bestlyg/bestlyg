from preclude import *


class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        if grid[0][0] == 1:
            return -1
        q = deque()
        q.append((0, 0))
        n = len(grid)
        step = size = 1
        used = [[False for _ in range(n)] for _ in range(n)]
        while len(q):
            (x, y) = q.popleft()
            if x == n - 1 and y == n - 1:
                return step
            for dir in dirs2:
                nx = x + dir[0]
                ny = y + dir[1]
                if nx >= 0 and nx < n and ny >= 0 and ny < n and grid[nx][ny] == 0 and not used[nx][ny]:
                    used[nx][ny] = True
                    q.append((nx, ny))
            size -= 1
            if size == 0:
                size = len(q)
                step += 1
        return -1


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
