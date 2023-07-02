from preclude import *


class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        head = ListNode()
        p = head
        add = 0
        while l1 or l2:
            val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + add
            if val >= 10:
                val -= 10
                add = 1
            else:
                add = 0
            p.next = ListNode(val)
            p = p.next
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
        if add:
            p.next = ListNode(1)
        return head.next


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
