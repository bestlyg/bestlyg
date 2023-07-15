from preclude import *


class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        res = []
        nums.sort()
        i = 0
        while i + 3 < n and (nums[i] <= target or nums[i] < 0):
            if i > 0 and nums[i] == nums[i - 1]:
                i += 1
                continue
            j = i + 1
            while j + 2 < n and (nums[i] + nums[j] <= target or nums[j] < 0):
                if j > i + 1 and nums[j] == nums[j-1]:
                    j += 1
                    continue
                num = nums[i] + nums[j]
                l = j + 1
                r = n-1
                while l < r:
                    if num + nums[l] + nums[r] > target:
                        r -= 1
                    elif num + nums[l] + nums[r] < target:
                        l += 1
                    else:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        while l + 1 < r and nums[l + 1] == nums[l]:
                            l += 1
                        while r - 1 > l and nums[r - 1] == nums[r]:
                            r -= 1
                        l += 1
                        r -= 1
                j += 1
            i += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
