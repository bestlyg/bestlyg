from math import floor, sqrt
from preclude import *

dirs = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]


class Solution:
    def queensAttacktheKing(self, queens: List[List[int]], king: List[int]) -> List[List[int]]:
        board = [[False for j in range(8)] for i in range(8)]
        for [x, y] in queens:
            board[x][y] = True
        res = []

        def check(pos: List[int], dir: List[int]) -> bool:
            for _ in range(1, 8):
                pos[0] += dir[0]
                pos[1] += dir[1]

                if 0 <= pos[0] < 8 and 0 <= pos[1] < 8:
                    if board[pos[0]][pos[1]]:
                        res.append([pos[0], pos[1]])
                        return
                else:
                    return
        for d in dirs:
            check(list(king), d)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
