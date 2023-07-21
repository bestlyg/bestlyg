from preclude import *


class Solution:
    def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
        res = -inf
        q = deque()
        for cur in points:
            while len(q) and cur[0] - q[0][0] > k:
                q.popleft()
            if len(q):
                res = max(res, cur[0]+cur[1]+q[0][0]-q[0][1])
            while len(q) and points[q[-1]][1] - points[q[-1]][0] < cur[1] - cur[0]:
                q.pop()
            q.append(cur)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
