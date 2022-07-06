import { FenwickTree } from "./fenwickTree";

describe('FenwickTree', () => {
  let tree: FenwickTree;
  beforeEach(() => {
    tree = new FenwickTree(10);
  });
  test('common', () => {
    tree.add(1, 1);
    expect(tree.at(1)).toBe(1);
    tree.add(4, 5);
    expect(tree.query(4)).toBe(6);
    expect(tree.at(4)).toBe(5);
    tree.add(1, 1);
    expect(tree.query(4)).toBe(7);
    expect(tree.at(1)).toBe(2);
  });
});
