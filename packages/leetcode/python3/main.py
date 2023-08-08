from preclude import *


class Solution:
    def maxAbsoluteSum(self, nums: List[int]) -> int:
        nmin = nmax = res = 0
        for num in nums:
            nmin, nmax = min(num, nmin + num), max(0, nmax + num)
            res = max(res, max(abs(nmin), abs(nmax)))
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
