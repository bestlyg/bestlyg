from math import isqrt
from preclude import *


class Solution:
    def reconstructMatrix(self, upper: int, lower: int, colsum: List[int]) -> List[List[int]]:
        n = len(colsum)
        list1 = [0 for _ in range(n)]
        list2 = [0 for _ in range(n)]
        for i in range(n):
            if colsum[i] == 2:
                list1[i] = list2[i] = 1
                if upper <= 0 or lower <= 0:
                    return []
                upper -= 1
                lower -= 1
        for i in range(n):
            if colsum[i] == 1:
                if upper > 0:
                    list1[i] = 1
                    upper -= 1
                elif lower > 0:
                    list2[i] = 1
                    lower -= 1
                else:
                    return []
        return [list1, list2] if upper == 0 and lower == 0 else []


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
