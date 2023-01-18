
from queue import Queue
from sortedcontainers import SortedList


class MKAverage:
    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.sum = 0
        self.q = Queue()
        self.s1 = SortedList()
        self.s2 = SortedList()
        self.s3 = SortedList()

    def calculateMKAverage(self) -> int:
        if self.q.qsize() < self.m:
            return -1
        else:
            return self.sum // (self.m - self.k * 2)

    def addElement(self, num: int) -> None:
        self.q.put(num)
        if self.q.qsize() <= self.m:
            self.s2.add(num)
            self.sum += num
            if self.q.qsize() == self.m:
                for _ in range(self.k):
                    self.sum -= self.s2[-1]
                    self.s3.add(self.s2.pop())

                    self.sum -= self.s2[0]
                    self.s1.add(self.s2.pop(0))
        else:
            if num < self.s2[0]:
                self.s1.add(num)
                self.sum += self.s1[-1]
                self.s2.add(self.s1.pop())
            elif num >= self.s3[0]:
                self.s3.add(num)
                self.sum += self.s3[0]
                self.s2.add(self.s3.pop(0))
            else:
                self.sum += num
                self.s2.add(num)
            removeVal = self.q.get()
            if self.s1.count(removeVal):
                self.s1.discard(removeVal)
                self.sum -= self.s2[0]
                self.s1.add(self.s2.pop(0))
            elif self.s3.count(removeVal):
                self.s3.discard(removeVal)
                self.sum -= self.s2[-1]
                self.s3.add(self.s2.pop())
            else:
                self.sum -= removeVal
                self.s2.discard(removeVal)
