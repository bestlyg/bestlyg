from preclude import *


class Solution:
    def reverseString(self, s: List[str]) -> None:
        l = 0
        r = len(s) - 1
        while l < r:
            (s[l], s[r]) = (s[r], s[l])
            l += 1
            r -= 1


class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        return swap(head, 1, 2)[0]


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
