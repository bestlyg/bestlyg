from preclude import *


class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        if not len(nums):
            return []
        res = []
        prev = False
        cur = (0, 0)
        for num in nums:
            if not prev:
                prev = True
                cur = (num, num)
            elif cur[1] + 1 == num:
                cur[1] = num
            else:
                item = str(cur.first) if cur.first == cur[1] else str(
                    cur.first) + "->" + str(cur.second)
                res.append(item)
                cur = (num, num)
        if prev:
            item = str(cur.first) if cur.first == cur[1] else str(
                cur.first) + "->" + str(cur.second)
            res.append(item)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
