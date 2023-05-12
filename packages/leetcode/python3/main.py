from preclude import *


class Solution:
    def maxValueAfterReverse(self, nums: List[int]) -> int:
        n = len(nums)
        sums = 0
        nmax = -inf
        nmin = inf
        val = 0
        for i in range(1, n):
            num = abs(nums[i] - nums[i - 1])
            sums += num
            nmax = max(nmax, min(nums[i], nums[i - 1]))
            nmin = min(nmin, max(nums[i], nums[i - 1]))
            val = max(val, max(abs(nums[i] - nums[0]), abs(nums[i - 1] - nums[n - 1])) - num)
        return sums + max(val, 2 * (nmax - nmin))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
