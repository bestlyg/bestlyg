import React, { useState } from 'react';
import { useCreation } from 'ahooks';
import { Button, Col, InputNumber, Row, Card, Empty, Space } from 'antd';
import { isEqual, permutation } from './utils';
import { useEffect } from 'react';

enum NodeType {
  Op,
  Num,
}
class Node {
  type: NodeType;
  left: Node | null = null;
  right: Node | null = null;
  constructor(public value: string | number) {
    if (typeof value === 'number') this.type = NodeType.Num;
    if (typeof value === 'string') this.type = NodeType.Op;
  }
  toString() {
    if ((!this.left && !this.right) || this.type === NodeType.Num) return `${this.value}`;
    return `(${this.left.toString()}) ${this.value} (${this.right.toString()})`;
  }
  compute() {
    if (this.type === NodeType.Num) return this.value;
    switch (this.value) {
      case '+':
        return this.left.compute() + this.right.compute();
      case '-':
        return this.left.compute() - this.right.compute();
      case '*':
        return this.left.compute() * this.right.compute();
      case '/':
        return this.left.compute() / this.right.compute();
      default:
        throw new Error('an unkown operation');
    }
  }
}

function toTree(nums: number[], ops: string[]): Node[] {
  if (nums.length === 1) return [new Node(nums[0])];
  const res: Node[] = [];
  for (let i = 0; i < ops.length; i++) {
    const lefts = toTree(nums.slice(0, i + 1), ops.slice(0, i));
    const rights = toTree(nums.slice(i + 1), ops.slice(i + 1));
    for (const left of lefts) {
      for (const right of rights) {
        const root = new Node(ops[i]);
        root.left = left;
        root.right = right;
        res.push(root);
      }
    }
  }
  return res;
}

export function compute24(nums: number[], ops: string[], target: number): string[] {
  const res: string[] = [];
  const lnums = permutation({ list: nums, same: false });
  const lops = permutation({ list: ops, same: true });
  //   console.log('lnums', lnums);
  //   console.log('lops', lops);
  for (const nums of lnums) {
    for (const ops of lops) {
      const trees = toTree(nums, ops);
      for (const tree of trees) {
        // console.log(`tree = ${tree.toString()}, val = ${tree.compute()}`);
        if (isEqual(tree.compute(), target)) res.push(tree.toString());
      }
    }
  }
  return res;
}
