from preclude import *


class Node:
    def __init__(self, p: Tuple[int, int], b: Tuple[int, int]) -> None:
        self.p = p
        self.b = b


class Solution:
    def minPushBox(self, grid: List[List[str]]) -> int:
        t, p, b = (0, 0), (0, 0), (0, 0)
        n = len(grid)
        m = len(grid[0])
        used = defaultdict(dict)

        def is_valid(v: Tuple[int, int]) -> bool:
            return 0 <= v[0] < n and 0 <= v[1] < m

        def is_same(a: Tuple[int, int], b: Tuple[int, int]):
            return a[0] == b[0] and a[1] == b[1]

        def get_uf(cur: Node) -> UnionFind:
            uf = UnionFind(n * m)
            for i in range(n):
                for j in range(m):
                    if grid[i][j] == '.' and not is_same(cur.b, (i, j)):
                        for k in range(4):
                            ni = i + dirs[k][0]
                            nj = j + dirs[k][1]
                            if is_valid(ni, nj) and grid[ni][nj] == '.' and not is_same(cur.b, (ni, nj)):
                                uf.uni(pos2Idx(i, j, m), pos2Idx(ni, nj, m))
            return uf
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 'T':
                    t = (i, j)
                    grid[i][j] == '.'
                elif grid[i][j] == 'B':
                    b = (i, j)
                    grid[i][j] == '.'
                elif grid[i][j] == 'S':
                    p = (i, j)
                    grid[i][j] == '.'

        q = deque()
        q.append(Node(p, b))
        size = 1
        step = 0
        while len(q):
            cur: Node = q.popleft()
            if is_same(cur.b, t):
                return step
            uf = get_uf(cur)
            for k in range(4):
                ni = cur.b.X + dirs[k][0]
                nj = cur.b.Y + dirs[k][1]
                bi = cur.b.X - dirs[k][0]
                bj = cur.b.Y - dirs[k][1]
                pidx = pos2Idx(cur.p.X, cur.p.Y, m)
                bidx = pos2Idx(cur.b.X, cur.b.Y, m)
                if is_valid((ni, nj)) and grid[ni][nj] == '.' and is_valid((bi, bj)) and grid[bi][bj] == '.' and uf.same(pidx, pos2Idx(bi, bj, m)) and pos2Idx(ni, nj, m) not in used[bidx]:
                    q.append(Node(cur.b, (ni, nj)))
                    used[bidx][pos2Idx(ni, nj, m)] = True
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
