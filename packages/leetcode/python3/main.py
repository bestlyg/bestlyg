from preclude import *


class Solution:
    def haveConflict(self, event1: List[str], event2: List[str]) -> bool:
        def to_time(t: str):
            return int(t[:2]) * 60 + int(t[3:])
        s1, e1 = to_time(event1[0]), to_time(event1[1])
        s2, e2 = to_time(event2[0]), to_time(event2[1])
        if s1 > s2:
            s1, e1, s2, e2 = s2, e2, s1, e1
        return e1 >= s2


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
