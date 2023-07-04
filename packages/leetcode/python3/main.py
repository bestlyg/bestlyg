from preclude import *


class Solution:
    def matrixSum(self, nums: List[List[int]]) -> int:
        for l in nums:
            l.sort()
        res = 0
        for j in range(len(nums[0]) - 1, -1, -1):
            val = 0
            for i in range(len(nums)):
                val = max(val, nums[i][j])
            res += val
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
