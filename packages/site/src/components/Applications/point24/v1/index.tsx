import React, { useState } from 'react';
import { useCreation } from 'ahooks';
import { Button, Col, InputNumber, Row, Card, Empty, Space } from 'antd';
import { random, EPSILON } from '../utils';
import { useEffect } from 'react';

export function compute24(nums: number[], ops: string[], target: number): string[] {
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
                for (const temp of getTemplate(
                  nums[num1],
                  nums[num2],
                  nums[num3],
                  nums[num4],
                  ops[op1],
                  ops[op2],
                  ops[op3]
                )) {
                  const num = eval(temp);
                  if (Math.abs(target - num) <= EPSILON) res.push(temp);
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
}

function getTemplate(
  num1: number,
  num2: number,
  num3: number,
  num4: number,
  op1: string,
  op2: string,
  op3: string
) {
  return [
    `${num1}${op1}${num2}${op2}${num3}${op3}${num4}`,
    `(${num1}${op1}(${num2}${op2}${num3}))${op3}${num4}`,
    `((${num1}${op1}${num2})${op2}${num3})${op3}${num4}`,
    `${num1}${op1}(${num2}${op2}(${num3}${op3}${num4}))`,
    `${num1}${op1}((${num2}${op2}${num3})${op3}${num4})`,
    `(${num1}${op1}${num2})${op2}(${num3}${op3}${num4})`,
    `${num1}${op1}${num2}${op2}(${num3}${op3}${num4})`,
    `(${num1}${op1}${num2})${op2}${num3}${op3}${num4}`,
  ];
}
