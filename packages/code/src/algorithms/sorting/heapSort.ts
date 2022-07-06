import { Comparator } from '@/shared';

export const heapSort = <T extends any>(compare: Comparator<T>, list: T[]) => {
  let lastIndex = list.length - 1;
  const shiftUp = (index: number): void => {
    if (index === 0) return;
    const parentIndex = (index - 1) >> 1;
    if (compare(list[index], list[parentIndex]) > 0) {
      [list[index], list[parentIndex]] = [list[parentIndex], list[index]];
      shiftUp(parentIndex);
    }
  };
  const shiftDown = (index: number): void => {
    let childIndex = index * 2 + 1;
    if (childIndex > lastIndex) return;
    if (childIndex + 1 <= lastIndex && compare(list[childIndex + 1], list[childIndex]) > 0)
      childIndex++;
    if (compare(list[childIndex], list[index]) > 0) {
      [list[childIndex], list[index]] = [list[index], list[childIndex]];
      shiftDown(childIndex);
    }
  };
  for (let i = 0; i <= lastIndex; i++) shiftUp(i);
  while (lastIndex > 0) {
    [list[0], list[lastIndex--]] = [list[lastIndex], list[0]];
    shiftDown(0);
  }
};
