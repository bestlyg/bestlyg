from preclude import *


class Solution:
    def findValueOfPartition(self, nums: List[int]) -> int:
        nums.sort()
        return max(nums[i] - nums[i - 1] for i in range(1, len(nums)))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
