import { manacher } from './manacher';

describe('Manacher', () => {
  test('empty str', () => {
    expect(manacher('')).toBe('');
  });
  test('commonTest', () => {
    const list = [
      {
        str: 'absbsbsbs',
        expectStr: 'bsbsbsb',
      },
      {
        str: 'absbsbas',
        expectStr: 'absbsba',
      },
      {
        str: 'avcefghijkkjihgfeqba',
        expectStr: 'efghijkkjihgfe',
      },
      {
        str: 'avcqbqbqsafijnokmmkonjiqba',
        expectStr: 'ijnokmmkonji',
      },
      {
        str: 'aeftotfea',
        expectStr: 'aeftotfea',
      },
      {
        str: 'otftotftot',
        expectStr: 'otftotfto',
      },
    ];
    for (const { str, expectStr } of list) {
      expect(manacher(str)).toBe(expectStr);
    }
  });
});
