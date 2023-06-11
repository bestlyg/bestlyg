from preclude import *


class Solution:
    def removeZeroSumSublists(self, head: Optional[ListNode]) -> Optional[ListNode]:
        h = ListNode()
        h.next = head
        sums = [1]
        p = h
        start = end = -1
        find = False
        while p.next and not find:
            sum = p.next.val + sums[-1]
            sums.append(sum)
            for i in range(len(sums) - 1):
                if sum - sums[i] == 0:
                    start = i
                    end = len(sums) - 1
                    find = True
                    break
            p = p.next
        if start == -1:
            return h.next
        p = h
        for i in range(start):
            p = p.next
        while end-start > 0:
            p.next = p.next.next
            end -= 1
        return self.removeZeroSumSublists(h.next)


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
