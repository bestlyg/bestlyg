import {
    throwError,
    ErrorEnum,
    ERROR_SUBSCRIPT_OUT_OF_BOUNDS,
    ANY_OBJ,
    ELEMENT_NOT_FOUNT,
} from '@/shared';
/**
 * 列表接口
 */
export interface ISingleLinkedList<T> {
    /**
     * 当前链表含有的节点数
     */
    size: number;
    /**
     * 在index位置插入元素
     * @param {T} element 插入元素值
     * @param {number} index 插入的位置下标，若不传则默认为最后一位元素
     */
    add(element: T, index?: number): void;
    /**
     * 获index位置的元素
     * @param {number} index 元素的下标
     */
    get(index: number): T;
    /**
     * 设置index位置的元素，返回原位置元素
     * @param {number} index 元素的下标
     * @param {T} element 更改的值
     */
    set(index: number, element: T): T;
    /**
     * 删除元素，
     * 当传入元素下标返回删除的节点值，
     * 删除成功返回值
     * @param {number} element 传入元素的下标
     */
    delete(index: number): T;
    /**
     * 获取元素的index，
     * 元素的下标，
     * 若不存在返回-1
     * @param {T} element 元素的值
     */
    find(element: T): number;
}
export class SingleLinkedListNode<T> {
    constructor(
        public val: T,
        public next: SingleLinkedListNode<T> | null = null,
    ) {}
}
export class SingleLinkedList<T> implements ISingleLinkedList<T> {
    private dummyHead = new SingleLinkedListNode(ANY_OBJ);
    private _size: number = 0;
    get size() {
        return this._size;
    }
    add(element: T, index: number = this.size): void {
        this.checkAddRange(index) || throwError(ERROR_SUBSCRIPT_OUT_OF_BOUNDS, ErrorEnum.range);
        let p = this.dummyHead;
        while (index--) p = p.next!;
        const newNode = new SingleLinkedListNode(element, p.next);
        p.next = newNode;
        this._size++;
    }
    set(index: number, element: T): T {
        this.checkRange(index) || throwError(ERROR_SUBSCRIPT_OUT_OF_BOUNDS, ErrorEnum.range);
        let p = this.dummyHead;
        while (index--) p = p.next!;
        const val = p.next!.val;
        p.next!.val = element;
        return val;
    }
    delete(index: number): T {
        this.checkRange(index) || throwError(ERROR_SUBSCRIPT_OUT_OF_BOUNDS, ErrorEnum.range);
        let p = this.dummyHead;
        while (index--) p = p.next!;
        const val = p.next!.val;
        p.next = p.next!.next;
        this._size--;
        return val;
    }
    get(index: number): T {
        this.checkRange(index) || throwError(ERROR_SUBSCRIPT_OUT_OF_BOUNDS, ErrorEnum.range);
        let p = this.dummyHead;
        while (index--) p = p.next!;
        return p.next!.val;
    }
    find(element: T): number {
        let p = this.dummyHead;
        let index = 0;
        while (p.next !== null && p.next.val !== element) {
            p = p.next!;
            index++;
        }
        return p.next ? index : ELEMENT_NOT_FOUNT;
    }
    private checkAddRange(index: number): boolean {
        return this.checkRange(index) || index === this.size;
    }
    private checkRange(index: number): boolean {
        return index >= 0 && index < this._size;
    }
}
