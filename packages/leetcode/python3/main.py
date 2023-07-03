from preclude import *


def getLen(l: Optional[ListNode]):
    if not l:
        return 0
    cnt = 0
    while l:
        cnt += 1
        l = l.next
    return cnt


def dfs(l1: Optional[ListNode], l2: Optional[ListNode]) -> Tuple[int, ListNode]:
    if not l1:
        return (0, l2)
    if not l2:
        return (0, l1)
    add, next = dfs(l1.next, l2.next)
    l1.next = next
    l1.val += l2.val + add
    add = 0
    if l1.val >= 10:
        l1.val -= 10
        add = 1
    return (add, l1)

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        len1, len2 = getLen(l1), getLen(l2)
        if len2 > len1:
            len1, len2 = len2, len1
            l1, l2 = l2, l1
        while len1 > len2:
            head = ListNode(0, l2)
            l2 = head
            len2 += 1
        add = dfs(l1, l2)
        if add:
            head = ListNode(1, l1)
            l1 = head
        return l1


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
