from preclude import *


class TreeAncestor:

    def __init__(self, n: int, parent: List[int]):
        self.list = [[] for _ in range(n)]
        for i in range(1, len(parent)):
            self.list[i].append(parent[i])
            j = res = 1
            while res != -1:
                res = self.getKthAncestor(i, pow(2, j))
                if res != -1:
                    self.list[i].append(res)
                j += 1

    def getKthAncestor(self, node: int, k: int) -> int:
        if k == 0:
            return node
        l = -1
        r = len(self.list[node]) - 1
        while l < r:
            m = (l+r+1)//2
            if k >= pow(2, m):
                l = m
            else:
                r = m-1
        if l == -1:
            return l
        return self.getKthAncestor(self.list[node][l], k-pow(2, l))


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
