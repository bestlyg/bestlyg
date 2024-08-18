import { Comparator } from '@/shared';

export const bubbleSort = <T = any>(compare: Comparator<T>, list: T[]) => {
    for (let len = list.length, i = len - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            if (compare(list[j - 1], list[j]) > 0) [list[j - 1], list[j]] = [list[j], list[j - 1]];
        }
    }
};
