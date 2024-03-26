import { ELEMENT_NOT_FOUNT, ERROR_SUBSCRIPT_OUT_OF_BOUNDS } from '@/shared';
import { SingleLinkedList } from './singleLinkedList';

describe('SingleLinkedList', () => {
    test('add', () => {
        const list = new SingleLinkedList<number>();
        list.add(111, 0);
        expect(list.size).toBe(1);
        expect(list.get(0)).toBe(111);
    });
    test('get', () => {
        const list = new SingleLinkedList<number>();
        list.add(1, 0);
        list.add(2, 0);
        list.add(3, 0);
        list.add(4, 3);
        expect(list.get(0)).toBe(3);
        expect(list.get(1)).toBe(2);
        expect(list.get(2)).toBe(1);
        expect(list.get(3)).toBe(4);
        expect(list.size).toBe(4);
    });
    test('delete', () => {
        const list = new SingleLinkedList<number>();
        list.add(1, 0);
        list.add(2, 0);
        list.add(3, 0);
        list.add(4, 3);
        list.delete(2);
        expect(list.size).toBe(3);
        expect(list.get(2)).toBe(4);
    });
    test('set', () => {
        const list = new SingleLinkedList<number>();
        list.add(1, 0);
        list.add(2, 0);
        list.add(3, 0);
        list.add(4, 3);
        expect(list.size).toBe(4);
        expect(list.get(2)).toBe(1);
        list.set(2, 12);
        expect(list.get(2)).toBe(12);
    });
    test('indexOf', () => {
        const list = new SingleLinkedList<number>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        expect(list.find(3)).toBe(2);
        expect(list.find(5)).toBe(ELEMENT_NOT_FOUNT);
    });
    test('checkRange', () => {
        const list = new SingleLinkedList<number>();
        const errorStr = `RangeError: ${ERROR_SUBSCRIPT_OUT_OF_BOUNDS}`;
        try {
            list.add(1, 1);
        } catch (error) {
            expect(error.toString()).toBe(errorStr);
        }
        try {
            list.get(1);
        } catch (error) {
            expect(error.toString()).toBe(errorStr);
        }
        try {
            list.set(1, 1);
        } catch (error) {
            expect(error.toString()).toBe(errorStr);
        }
        try {
            list.delete(1);
        } catch (error) {
            expect(error.toString()).toBe(errorStr);
        }
    });
});
