from preclude import *


class Codec:

    def serialize(self, node: Optional[TreeNode]) -> str:
        """Encodes a tree to a single string.
        """
        if not node:
            return "N"
        return f"{node.val},({self.serialize(node.left)}),({self.serialize(node.right)})"

    def deserialize(self, s: str) -> Optional[TreeNode]:
        """Decodes your encoded data to tree.
        """
        if s == "N":
            return None
        s1 = s2 = s3 = ''
        split_idx = -1
        level = 0
        for i in range(len(s)):
            if s[i] == '(':
                level += 1
            elif s[i] == ')':
                level -= 1
            elif s[i] == ',' and level == 0:
                if split_idx == -1:
                    s1 = s[:i]
                    split_idx = i + 1
                else:
                    s2 = s[split_idx + 1:i - 1]
                    s3 = s[i + 2:-1]
        return TreeNode(int(s1), self.deserialize(s2), self.deserialize(s3))


class Codec:

    def serialize(self, root: Optional[TreeNode]) -> str:
        """Encodes a tree to a single string.
        """
        return node2str(root)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Decodes your encoded data to tree.
        """


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
