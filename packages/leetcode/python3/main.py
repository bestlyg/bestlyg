from math import isqrt
from preclude import *


dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]


class Solution:
    def checkOverlap(self, radius: int, xCenter: int, yCenter: int, x1: int, y1: int, x2: int, y2: int) -> bool:
        x = max(min(xCenter, x2), x1) - xCenter
        y = max(min(yCenter, y2), y1) - yCenter
        return pow(x, 2) + pow(y, 2) <= pow(radius, 2)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
