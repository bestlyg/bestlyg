from preclude import *


class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        res = 0

        def dfs(node: Optional[TreeNode]) -> Tuple[int, int]:
            if not node:
                return (0, 0)
            l = dfs(node.left)
            r = dfs(node.right)
            nsum = l[0] + r[0] + 1
            csum = l[1] + r[1] + node.val
            res += abs(nsum-csum)
            return (nsum, csum)

        dfs(root)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
