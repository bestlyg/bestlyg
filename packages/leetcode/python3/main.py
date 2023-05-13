from preclude import *


class Solution:
    def findMaxK(self, nums: List[int]) -> int:
        list = [0] * 2005
        res = -1
        for num in nums:
            list[num + 1000] += 1
            if list[-num + 1000]:
                res = max(res, abs(num))
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
