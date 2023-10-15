from preclude import *


class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        v = reduce(lambda a, b: a ^ b, nums)
        v &= -v
        num1 = num2 = 0
        for num in nums:
            if v & num:
                num1 ^= num
            else:
                num2 ^= num
        return [num1, num2]


# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
