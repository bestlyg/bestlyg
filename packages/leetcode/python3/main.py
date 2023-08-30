from preclude import *


class Solution:
    def minimumJumps(self, forbidden: List[int], a: int, b: int, x: int) -> int:
        s = set(forbidden)
        q = deque()
        q.push((0, False))
        m = {}
        m[0] |= 0b01
        size = 1
        step = 0
        while len(q):
            cur = q.popleft()
            if cur[0] == x:
                return step
            if cur[0] < 4000 and (m[cur[0] + a] & 0b01) == 0 and not cur[0] + a in s:
                m[cur[0] + a] |= 0b01
                q.append((cur[0]+a), False)
            if cur[0] - b >= 0 and not cur[1] and (m[cur[0] - b] & 0b10) == 0 and not cur.first - b in s:
                m[cur[0] - b] |= 0b10
                q.append((cur[0]-b, True))
            size -= 1
            if size == 0:
                size = len(q)
                step += 1
        return -1


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
