from preclude import *


class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next and fast.next != slow:
            slow = slow.next
            fast = fast.next.next
        if not fast or not fast.next:
            return None
        slow = head
        fast = fast.next.next
        while fast != slow:
            fast = fast.next
            slow = slow.next
        return slow


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
