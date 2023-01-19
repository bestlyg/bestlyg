
from queue import Queue
from sortedcontainers import SortedList


class Solution:
    def strongPasswordCheckerII(self, password: str) -> bool:
        spec = "!@#$%^&*()-+"
        f = [False for _ in range(4)]
        for i, c in enumerate(password):
            f[0] |= c.islower()
            f[1] |= c.isupper()
            f[2] |= c.isdigit()
            f[3] |= spec.find(c) != -1
            if i != 0 and password[i - 1] == c:
                return False
        return len(password) >= 8 and f[0] and f[1] and f[2] and f[3]


def main():
    o = Solution()
    o.strongPasswordCheckerII("IloveLe3tcode!")


main()
