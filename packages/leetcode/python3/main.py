from preclude import *


dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]


class Solution:
    def pondSizes(self, land: List[List[int]]) -> List[int]:
        n = len(land)
        m = len(land[0])
        used = [[False for _ in range(m)] for _ in range(n)]
        res = []
        for i in range(n):
            for j in range(m):
                if not used[i][j] and land[i][j] == 0:
                    used[i][j] = 1
                    q = deque()
                    q.append((i, j))
                    cnt = 1
                    while len(q):
                        cur = q.popleft()
                        for dir in dirs2:
                            ni = cur[0] + dir[0]
                            nj = cur[1] + dir[1]
                            if 0 <= ni < n and 0 <= nj < m and land[ni][nj] == 0 and not used[ni][nj]:
                                cnt += 1
                                used[ni][nj] = 1
                                q.append((ni, nj))
        res.sort()
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
