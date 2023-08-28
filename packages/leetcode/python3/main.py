from preclude import *


class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        n = len(intervals)
        i = 0
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1
        if i == n:
            res.push_back(newInterval)
        elif intervals[i][0] > newInterval[1]:
            res.push_back(newInterval)
            while i < n:
                res.push_back(intervals[i])
                i += 1
        else:
            res.push_back(
                [min(intervals[i][0], newInterval[0]),
                 max(intervals[i][1], newInterval[1])]
            )
            i += 1
            while i < n:
                if res.back()[1] >= intervals[i][0]:
                    res.back()[1] = max(res.back()[1], intervals[i][1])
                else:
                    res.push_back(intervals[i])
                i += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
