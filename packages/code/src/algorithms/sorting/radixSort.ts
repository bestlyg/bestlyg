const MAX = 65536;
const getLow16 = (num: number) => num & 0xffff;
const getHigh16 = (num: number) => (num & 0xffff0000) >> 16;
export const radixSort = (list: number[]) => {
    const len = list.length;
    const arr = new Array(MAX).fill(0);
    const tempList: number[] = [];
    [getLow16, getHigh16].forEach(fn => {
        arr.fill(0);
        list.forEach(num => arr[fn(num)]++);
        for (let i = 1; i < MAX; i++) arr[i] += arr[i - 1];
        for (let i = len - 1; i >= 0; i--) tempList[--arr[fn(list[i])]] = list[i];
        tempList.forEach((num, i) => (list[i] = num));
    });
};
