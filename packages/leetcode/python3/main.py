from preclude import *


class Solution:
    def maximumEvenSplit(self, finalSum: int) -> List[int]:
        res = []
        if finalSum % 2 != 0: return res
        num = 2
        while num <= finalSum:
            res.append(num)
            finalSum -= num
            num += 2
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
