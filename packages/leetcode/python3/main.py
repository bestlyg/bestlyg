from math import floor, sqrt
from preclude import *


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        used_count = 0
        arr = [[set(), set()] for _ in range(numCourses)]
        for [item1, item2] in prerequisites:
            arr[item2][0].add(item1)
            arr[item1][1].add(item2)
        q = [i for i in range(numCourses) if not len(arr[i][0])]
        if not len(q):
            return False
        while len(q):
            cur = q.pop()
            used_count += 1
            for child in arr[cur][1]:
                arr[child][0].remove(cur)
                if not len(arr[child][0]):
                    q.append(child)
        return used_count == numCourses


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
