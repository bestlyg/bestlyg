import { Trie } from './trie';

describe('Trie', () => {
  let trie: Trie;
  beforeEach(() => {
    trie = new Trie();
  });
  test('add', () => {
    trie.add('a');
    trie.add('abc');
    trie.add('abc');
    trie.add('abd');
    expect(trie.size).toBe(3);
    expect(trie.contains('a')).toBeTruthy();
    expect(trie.starsWith('a')).toBeTruthy();
    expect(trie.contains('ab')).toBeFalsy();
    expect(trie.starsWith('ab')).toBeTruthy();
    expect(trie.contains('abc')).toBeTruthy();
  });
  test('remove', () => {
    trie.add('abc');
    trie.add('abd');
    trie.remove('abc');
    trie.remove('abcd');
    trie.remove('abe');
    expect(trie.size).toBe(1);
    expect(trie.starsWith('ab')).toBeTruthy();
    expect(trie.contains('abd')).toBeTruthy();
    expect(trie.contains('abc')).toBeFalsy();
  });
  test('empty', () => {
    expect(trie.empty).toBeTruthy();
    trie.add('');
    expect(trie.empty).toBeFalsy();
    trie.clear();
    expect(trie.empty).toBeTruthy();
  });
  test('contains', () => {
    trie.add('');
    trie.add('c');
    trie.add('a');
    trie.add('abc');
    trie.add('abd');
    expect(trie.contains('')).toBeTruthy();
    expect(trie.contains('c')).toBeTruthy();
    expect(trie.contains('a')).toBeTruthy();
    expect(trie.contains('abc')).toBeTruthy();
    expect(trie.contains('abd')).toBeTruthy();
    expect(trie.contains('abe')).toBeFalsy();
    expect(trie.contains('abee')).toBeFalsy();
  });
});
