export const countingSort = (list: number[]) => {
    let min = Infinity;
    let max = -Infinity;
    list.forEach(num => {
        min = Math.min(min, num);
        max = Math.max(max, num);
    });
    const len = max - min + 1;
    const arr: number[] = new Array(max - min + 1).fill(0);
    list.forEach(num => arr[num - min]++);
    for (let num = 0, i = 0; num < len; num++) {
        while (arr[num]--) list[i++] = num + min;
    }
};
