from math import floor, sqrt
from preclude import *


class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        courses.sort(key=lambda o: o[1])
        q = []
        sum = 0
        for [d, e] in courses:
            sum += d
            heappush(q, d)
            print(q)
            if sum > e:
                sum -= heappop(q)
        return len(q)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
