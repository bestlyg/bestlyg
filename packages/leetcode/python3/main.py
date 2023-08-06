from preclude import *


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
def swap(node: Optional[ListNode], cnt: int, max_cnt: int) -> (Optional[ListNode], Optional[ListNode]):
    if not node:
        return (None, None)
    elif cnt == max_cnt:
        node.next = swap(node.next, 1, max_cnt)[0]
        return (node, node)
    elif not node.next:
        return (node, node)
    else:
        res = swap(node.next, cnt + 1, max_cnt)
        node.next = res[1].next
        res[1].next = node
        return res


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
