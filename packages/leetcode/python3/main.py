from preclude import *


class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        last = slow.next
        if not last:
            return
        while last.next:
            tmp = last.next
            last.next = tmp.next
            tmp.next = slow.next
            slow.next = tmp

        l1 = head
        l2 = slow.next
        while l1 and l2:
            tmp1 = l1.next
            tmp2 = l2.next
            l1.next = l2
            l2.next = tmp1
            l1 = tmp1
            l2 = tmp2
        slow.next = None


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
