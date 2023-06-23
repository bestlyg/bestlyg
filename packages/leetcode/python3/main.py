from preclude import *


dirs2 = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]


class Solution:
    def maximumValue(self, strs: List[str]) -> int:
        return max(
            (len(s) if not s.isdigit() else int(s))
            for s in strs
        )


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
