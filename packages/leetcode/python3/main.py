from preclude import *


class Node:
    def __init__(self, k: int, v: int):
        self.k = k
        self.v = v

    def __lt__(self, o: 'Node') -> bool:
        return self.v < o.v


class Solution:
    def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
        q = []
        m = Counter()
        for num in barcodes:
            m[num] += 1
        for k, v in m.items():
            heappush(q, Node(k, v))
        res = []
        while len(q) >= 2:
            item1 = heappop(q)
            item2 = heappop(q)
            item1.v -= 1
            if item1.v > 0:
                heappush(q, item1)
            item2.v -= 1
            if item2.v > 0:
                heappush(q, item2)
            res.append(item1.k)
            res.append(item2.k)
        if len(q):
            res.append(q[0].k)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
