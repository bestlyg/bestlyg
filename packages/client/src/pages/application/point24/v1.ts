// @ts-nocheck
import { Compute24, EPSILON, operation } from './utils';

type ExpressionCandidate = {
    text: string;
    value: number;
};

export const compute24: Compute24 = (nums, ops, target): string[] => {
    const res: string[] = [];
    const n = nums.length;
    const m = ops.length;
    const numSet = new Set();
    for (let num1 = 0; num1 < n; num1++) {
        numSet.add(num1);
        for (let num2 = 0; num2 < n; num2++) {
            if (numSet.has(num2)) continue;
            numSet.add(num2);
            for (let num3 = 0; num3 < n; num3++) {
                if (numSet.has(num3)) continue;
                numSet.add(num3);
                for (let num4 = 0; num4 < n; num4++) {
                    if (numSet.has(num4)) continue;
                    for (let op1 = 0; op1 < m; op1++) {
                        for (let op2 = 0; op2 < m; op2++) {
                            for (let op3 = 0; op3 < m; op3++) {
                                for (const { text, value } of getTemplate(
                                    nums[num1],
                                    nums[num2],
                                    nums[num3],
                                    nums[num4],
                                    ops[op1],
                                    ops[op2],
                                    ops[op3],
                                )) {
                                    if (Math.abs(target - value) <= EPSILON) res.push(text);
                                }
                            }
                        }
                    }
                }
                numSet.delete(num3);
            }
            numSet.delete(num2);
        }
        numSet.delete(num1);
    }
    return res;
};

function getTemplate(
    num1: number,
    num2: number,
    num3: number,
    num4: number,
    op1: string,
    op2: string,
    op3: string,
): ExpressionCandidate[] {
    const value1 = evaluateFlatExpression([num1, num2, num3, num4], [op1, op2, op3]);
    const value2 = operation(operation(num1, operation(num2, num3, op2), op1), num4, op3);
    const value3 = operation(operation(operation(num1, num2, op1), num3, op2), num4, op3);
    const value4 = operation(num1, operation(num2, operation(num3, num4, op3), op2), op1);
    const value5 = operation(num1, operation(operation(num2, num3, op2), num4, op3), op1);
    const value6 = operation(operation(num1, num2, op1), operation(num3, num4, op3), op2);
    const value7 = evaluateFlatExpression([num1, num2, operation(num3, num4, op3)], [op1, op2]);
    const value8 = evaluateFlatExpression([operation(num1, num2, op1), num3, num4], [op2, op3]);

    return [
        { text: `${num1}${op1}${num2}${op2}${num3}${op3}${num4}`, value: value1 },
        { text: `(${num1}${op1}(${num2}${op2}${num3}))${op3}${num4}`, value: value2 },
        { text: `((${num1}${op1}${num2})${op2}${num3})${op3}${num4}`, value: value3 },
        { text: `${num1}${op1}(${num2}${op2}(${num3}${op3}${num4}))`, value: value4 },
        { text: `${num1}${op1}((${num2}${op2}${num3})${op3}${num4})`, value: value5 },
        { text: `(${num1}${op1}${num2})${op2}(${num3}${op3}${num4})`, value: value6 },
        { text: `${num1}${op1}${num2}${op2}(${num3}${op3}${num4})`, value: value7 },
        { text: `(${num1}${op1}${num2})${op2}${num3}${op3}${num4}`, value: value8 },
    ];
}

function evaluateFlatExpression(nums: number[], ops: string[]): number {
    const values = [nums[0]];
    const lowPriorityOps: string[] = [];

    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const nextNum = nums[i + 1];
        if (op === '*' || op === '/') {
            values[values.length - 1] = operation(values[values.length - 1], nextNum, op);
            continue;
        }
        lowPriorityOps.push(op);
        values.push(nextNum);
    }

    return lowPriorityOps.reduce(
        (result, op, index) => operation(result, values[index + 1], op),
        values[0],
    );
}
