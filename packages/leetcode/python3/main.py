from preclude import *


class Solution:
    def queryString(self, s: str, n: int) -> bool:
        return all(bin(num)[2] in s for num in range(1, n + 1))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
