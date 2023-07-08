from preclude import *


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        n = len(numbers)
        for i in range(n):
            l = i + 1
            r = n
            while l < r:
                m = (l + r) // 2
                val = numbers[i] + numbers[m]
                if val < target:
                    l = m + 1
                else:
                    r = m
            if l != n and numbers[i] + numbers[l] == target:
                return [i+1, l+1]
        return []


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
