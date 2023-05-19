from preclude import *


class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        s = set()
        idxs = set()

        def dfs(cur: str):
            s.add(cur)
            if len(cur) == len(tiles):
                return
            for i in range(len(tiles)):
                if i in idxs:
                    continue
                idxs.add(i)
                dfs(cur + tiles[i])
                idxs.remove(i)
        dfs('')
        return len(s) - 1


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
