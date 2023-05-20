from preclude import *


class Node:
    def __init__(self, l: int, r: int, sum: int):
        self.l = l
        self.r = r
        self.sum = sum


class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        res = 0
        no = Node(-inf, -1, -1)

        def dfs(node: Optional[TreeNode]) -> Node:
            if not node:
                return no
            val = node.val
            lv, rv = dfs(node.left), dfs(node.right)
            if node.left == None and node.right == None:
                res = max(res, val)
                return Node(val, val, val)
            elif node.left == None:
                if rv.l == no.l:
                    return no
                if val >= rv.l:
                    return no
                rv.l = val
                rv.sum += val
                res = max(res, rv.sum)
                return rv
            elif node.right == None:
                if lv.l == no.l:
                    return no
                if lv.r >= val:
                    return no
                lv.r = val
                lv.sum += val
                res = max(res, lv.sum)
                return lv
            else:
                if lv.l == no.l or rv.l == no.l:
                    return no
                if lv.r >= val:
                    return no
                if val >= rv.l:
                    return no
                next = Node(lv.l, rv.r, lv.sum + rv.sum + val)
                res = max(res, next.sum)
                return next
        dfs(root)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
