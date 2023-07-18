from preclude import *


class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        class CmpNode:
            def __init__(self, idx: int) -> None:
                self.idx = idx

            def __lt__(self, o: 'CmpNode') -> bool:
                n1 = intervals[self.idx][1] - intervals[self.idx][0] + 1
                n2 = intervals[o.idx][1] - intervals[o.idx][0] + 1
                return n2 < n1

        res = [-1 for _ in range(len(queries))]
        intervals.sort(key=lambda v: v[0])
        idxs = [i for i in range(len(queries))]
        idxs.sort(key=lambda v: queries[v])
        q: List[CmpNode] = []
        iidx = 0
        for idx in idxs:
            cur = queries[idx]
            while iidx < len(intervals) and intervals[iidx][0] <= cur:
                heappush(q, iidx)
                iidx += 1
            while len(q) and intervals[q[0]][1] < cur:
                heappop(q)
            if len(q):
                interval = intervals[q[0]]
                res[idx] = interval[1] - interval[0] + 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
