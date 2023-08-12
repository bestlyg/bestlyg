from preclude import *


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

ListNode.__lt__ = lambda a, b: a.val < b.val


class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        head = ListNode()
        p = head
        q = []
        for node in lists:
            if node:
                heappush(q, node)
        while len(q):
            node = heappop(q)
            p = p.next = node
            if node.next:
                q.push(node.next)
        return head.next


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
