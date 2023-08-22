from preclude import *


class Solution:
    def maxDistToClosest(self, seats: List[int]) -> int:
        prev = -1
        idx = 0
        res = -inf
        while idx < len(seats):
            if seats[idx] == 1:
                if prev == -1:
                    res = max(res, idx)
                else:
                    res = max(res, (idx - prev) / 2)
                prev = idx
            idx += 1
        res = max(res, seats.size() - 1 - prev)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
