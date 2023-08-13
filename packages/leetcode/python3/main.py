from preclude import *


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i1 = m-1
        i2 = n-1
        for idx in range(len(nums1), -1, -1):
            if i2 < 0 or i1 >= 0 and nums1[i1] > nums2[i2]:
                nums1[idx] = nums1[i1]
                i1 -= 1
            else:
                nums1[idx] = nums2[i2]
                i2 -= 1


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
