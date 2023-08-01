from preclude import *


class Solution:
    def sumOfPower(self, nums: List[int]) -> int:
        nums.sort()
        res = sum = 0
        MOD = 1e9 + 7
        for i in range(len(nums)):
            num = nums[i]
            num2 = num * num % MOD
            res += num2 * num % MOD + sum * num2 % MOD
            sum = (sum * 2 % MOD + num) % MOD
        return res % MOD


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
