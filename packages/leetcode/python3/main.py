from preclude import *


class Solution:
    def captureForts(self, forts: List[int]) -> int:
        res = 0
        p0 = p1 = -1
        for i in range(len(forts)):
            fort = forts[i]
            if fort == 1:
                if p0 != -1 and p0 > p1:
                    res = max(res, i - p0 - 1)
                p1 = i
            elif fort == -1:
                if p1 != -1 and p1 > p0:
                    res = max(res, i - p1 - 1)
                p0 = i
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
