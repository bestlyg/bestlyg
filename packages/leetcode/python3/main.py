from preclude import *


class Solution:
    def ways(self, pizza: List[str], k: int) -> int:
        MOD = 1000000000 + 7
        n = len(pizza)
        m = len(pizza[0])

        @cache
        def has_apple(i1: int, j1: int, i2: int, j2: int) -> int:
            for i in range(i1, i2 + 1):
                for j in range(j1, j2 + 1):
                    if pizza[i][j] == 'A':
                        return True
            return False

        @cache
        def dfs(i1: int, j1: int, i2: int, j2: int, k: int) -> int:
            if k == 0:
                return 1 if has_apple(i1, j1, i2, j2) else 0
            res = 0
            if j1 != j2:
                f = False
                for j in range(j1, j2):
                    if not f:
                        f = f or has_apple(i1, j1, i2, j)
                    if f:
                        res = (res + dfs(i1, j + 1, i2, j2, k - 1)) % MOD
            if i1 != i2:
                f = False
                for i in range(i1, i2):
                    if not f:
                        f = f or has_apple(i1, j1, i, j2)
                    if f:
                        res = (res + dfs(i + 1, j1, i2, j2, k - 1)) % MOD
            return res

        return dfs(0, 0, n - 1, m - 1, k - 1)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
