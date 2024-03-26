import { Compute24, EPSILON, permutation, operation } from './utils';

export const compute24: Compute24 = (nums, ops, target): string[] => {
    const cache: Record<string, string[][]> = {};
    return next(nums).map(v => `[${v.join(' -> ')}]`);
    function next(nums: Parameters<Compute24>['0']): string[][] {
        nums.sort((a, b) => a - b);
        const formatStr = nums.join(',');
        if (cache[formatStr]) return cache[formatStr];
        if (nums.length === 1) {
            if (Math.abs(target - nums[0]) <= EPSILON) return (cache[formatStr] = [[`FIN`]]);
            return (cache[formatStr] = []);
        }
        const n = nums.length;
        const res: string[][] = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                for (const op of ops) {
                    const num = operation(nums[i], nums[j], op);
                    const nextNums = nums.filter((_, k) => k !== i && k !== j);
                    nextNums.push(num);
                    res.push(
                        ...next(nextNums)
                            .filter(v => v.length)
                            .map(v => [`${nums[i]} ${op} ${nums[j]}`, ...v])
                    );
                }
            }
        }
        return (cache[formatStr] = res);
    }
};
