from math import floor, sqrt
from preclude import *

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def repairCars(self, ranks: List[int], cars: int) -> int:
        l = 0
        r = 2 ** 63 - 1
        while l < r:
            m = (r - l) // 2 + l
            if sum(floor(sqrt(m / rank)) for rank in ranks) >= cars:
                r = m
            else:
                l = m + 1
        return l


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
