from preclude import *


class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head:
            return False
        slow = fast = head
        while fast and fast.next and fast.next != slow:
            fast = fast.next.next
            slow = slow.next
        return fast and fast.next == slow


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
