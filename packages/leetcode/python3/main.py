from preclude import *


class Solution:
    def largestValsFromLabels(self, values: List[int], labels: List[int], numWanted: int, useLimit: int) -> int:
        n = len(values)
        list = [i for i in range(n)]
        list.sort(key=lambda i: values[i])
        m = Counter()
        res = 0
        cnt = 0
        for i in range(n-1, -1, -1):
            if cnt >= numWanted:
                break
            if m[labels[list[i]]] == useLimit:
                continue
            m[labels[list[i]]] += 1
            res += values[list[i]]
            cnt += 1
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
