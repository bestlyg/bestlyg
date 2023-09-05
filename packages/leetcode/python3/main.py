from preclude import *


class Solution:
    def minNumber(self, nums1: List[int], nums2: List[int]) -> int:
        nums1.sort()
        nums2.sort()
        for num in nums1:
            if num in nums2:
                return num
        return min(nums1[0] * 10 + nums2[0], nums2[0] * 10 + nums1[0])


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
