from preclude import *


class Solution:
    def circularGameLosers(self, n: int, k: int) -> List[int]:
        list = [0 for _ in range(n)]
        cur = 0
        list[cur] += 1
        i = 1
        while True:
            cur = (cur + i * k) % n
            list[cur] += 1
            i += 1
            if list[cur] > 1:
                break
        res = []
        for i in range(n):
            if list[i] == 0:
                res.append(i + 1)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
