import { UnionFindSet } from './unionFindSet';
describe('UnionFindSet', () => {
    let uf: UnionFindSet<number>;
    beforeEach(() => {
        uf = new UnionFindSet<number>();
        for (let i = 0; i < 10; i++) uf.add(i);
    });
    describe('add', () => {
        test('el is exist', () => {
            uf.add(0);
            expect(uf.size).toBe(10);
        });
    });
    test('size', () => {
        expect(uf.size).toBe(10);
        uf.union(1, 2);
        uf.union(4, 5);
        uf.union(5, 6);
        expect(uf.size).toBe(7);
    });
    test('find', () => {
        uf.union(1, 2);
        uf.union(4, 5);
        uf.union(5, 6);
        expect(uf.find(0)).toBe(0);
        expect(uf.find(4)).toBe(4);
        expect(uf.find(5)).toBe(4);
        expect(uf.find(6)).toBe(4);
    });
    describe('same', () => {
        test('same', () => {
            uf.union(1, 2);
            uf.union(4, 5);
            uf.union(5, 6);
            expect(uf.same(1, 2)).toBeTruthy();
            expect(uf.same(2, 3)).toBeFalsy();
            expect(uf.same(3, 4)).toBeFalsy();
            expect(uf.same(4, 5)).toBeTruthy();
            expect(uf.same(4, 6)).toBeTruthy();
        });
        test('el is not exist', () => {
            expect(uf.same(11, 21)).toBeFalsy();
        });
    });
    describe('union', () => {
        test('union', () => {
            uf.union(1, 2);
            uf.union(3, 2);
            uf.union(4, 5);
            uf.union(7, 5);
            uf.union(6, 7);
            uf.union(3, 7);
            expect(uf.size).toBe(4);
        });
        test('el is not exist', () => {
            uf.union(1, 22);
            expect(uf.size).toBe(10);
        });
    });
});
