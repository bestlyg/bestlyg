from preclude import *


class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
        res = []
        s = set()
        for v in to_delete:
            s.add(v)

        def dfs(node: Optional[TreeNode], pd: bool):
            if node == None:
                return node
            d = node.val in s
            if not d and pd:
                res.append(node)
            node.left = dfs(node.left, d)
            node.right = dfs(node.right, d)
            return None if pd or d else node
        dfs(root, True)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
