/* istanbul ignore file */
import { repeat } from 'lodash';
import { IRBTree } from './rbTree';
const BLACK = false;
const RED = true;
type Color = boolean;
const isRed = (node: RBTreeNode2<any> | null) => node?.isRed ?? false;
const isBlack = (node: RBTreeNode2<any> | null) => node?.isBlack ?? true;
export class RBTreeNode2<T> {
    private _color: Color = RED;
    get color() {
        return this._color;
    }
    get isRed() {
        return this.color === RED;
    }
    get isBlack() {
        return this.color === BLACK;
    }
    get childSize() {
        return this.left === null && this.right === null
            ? 0
            : this.left === null && this.right !== null
            ? 1
            : this.left !== null && this.right === null
            ? 1
            : 2;
    }
    left: RBTreeNode2<T> | null = null;
    right: RBTreeNode2<T> | null = null;
    constructor(public val: T, public parent: RBTreeNode2<T> | null = null) {}
    toRed() {
        return this.toColor(RED);
    }
    toBlack() {
        return this.toColor(BLACK);
    }
    toColor(v: Color) {
        this._color = v;
        return this;
    }
    toString() {
        return `${this.val}【${this.isRed ? 'R' : 'B'}】`;
    }
}
export class RBTree2<T> implements IRBTree<T> {
    private _root: RBTreeNode2<T> | null = null;
    get root() {
        return this._root;
    }
    private _size = 0;
    get size() {
        return this._size;
    }
    get empty() {
        return this.size === 0;
    }
    constructor(private compare: (t1: T, t2: T) => number) {}
    clear() {
        this._root = null;
    }
    contains(v: T): boolean {
        return this.findNode(this.root, v)?.val !== null;
    }
    private findNode(root: RBTreeNode2<T> | null, v: T): RBTreeNode2<T> | null {
        if (root === null) return null;
        if (root.val === v) return root;
        if (this.compare(root.val, v) > 0) return this.findNode(root.left, v);
        else return this.findNode(root.right, v);
    }
    add(v: T): void {
        const oldNode = this.findNode(this.root, v);
        if (oldNode !== null) {
            oldNode.val = v;
            return;
        }
        if (this.root === null) {
            const node = new RBTreeNode2(v);
            this._root = node;
            this._size++;
            this.afterAdd(node);
            return;
        }
        let parent = this.root;
        let pos: 'left' | 'right' = 'left';
        while (parent) {
            const compare = this.compare(parent.val, v);
            if (compare > 0) {
                if (parent.left === null) break;
                parent = parent.left;
            } else {
                if (parent.right === null) {
                    pos = 'right';
                    break;
                }
                parent = parent.right;
            }
        }
        const node = new RBTreeNode2(v, parent);
        parent[pos] = node;
        this._size++;
        this.afterAdd(node);
    }
    afterAdd(node: RBTreeNode2<T>): void {
        let parent = node.parent;
        if (parent === null) {
            node.toBlack();
            return;
        }
        if (isBlack(parent)) return;
        const grand = parent.parent!;
        const sibling = grand.left === parent ? grand.right! : grand.left!;
        if (isRed(sibling)) {
            node.toRed();
            parent.toBlack();
            sibling.toBlack();
            this.afterAdd(grand.toRed());
            return;
        }
        if (grand.left === parent) {
            if (parent.right === node) {
                this.rotateL(parent);
                [parent, node] = [node, parent];
            }
            this.rotateR(grand);
        } else {
            if (parent.left === node) {
                this.rotateR(parent);
                [parent, node] = [node, parent];
            }
            this.rotateL(grand);
        }
        parent.toBlack();
        node.toRed();
        grand.toRed();
        return;
    }
    remove(v: T): void {
        let node = this.findNode(this.root, v);
        if (node === null) return;
        if (this.size === 1) {
            this._root = null;
            this._size = 0;
            return;
        }
        if (node.childSize === 2) {
            const successor = this.successor(node)!;
            [node.val, successor.val] = [successor.val, node.val];
            node = successor;
        }
        if (node.childSize === 0) {
            const parent = node.parent!;
            const pos = parent.left === node ? 'left' : 'right';
            parent[pos] = null;
            this._size--;
            this.afterRemove(node);
            return;
        }
        const child = node.left ?? node.right!;
        const parent = node.parent!;
        if (parent === null) {
            this._root = child;
            child.parent = null;
            this._size--;
            this.afterRemove(node);
            return;
        }
        const pos = parent.left === node ? 'left' : 'right';
        parent[pos] = child;
        child.parent = parent;
        this.afterRemove(child);
    }
    afterRemove(node: RBTreeNode2<T>): void {
        if (node.isRed) {
            node.toBlack();
            return;
        }
        let parent = node.parent;
        if (parent === null) return;
        const leftChild = parent.left === null || parent.left === node;
        let sibling = leftChild ? parent.right! : parent.left!;
        if (leftChild) {
            if (sibling.isRed) {
                this.rotateL(parent);
                sibling.toBlack();
                parent.toRed();
                sibling = parent.right!;
            }
            if (sibling.childSize === 0) {
                const parentIsBlack = parent.isBlack;
                sibling.toRed();
                parent.toBlack();
                parentIsBlack && this.afterRemove(parent);
            } else {
                if (isBlack(sibling.right)) {
                    this.rotateR(sibling);
                    sibling = sibling.parent!;
                }
                this.rotateL(parent);
                sibling.toColor(parent.color);
                sibling.right?.toBlack();
                parent.toBlack();
            }
        } else {
            if (sibling.isRed) {
                this.rotateR(parent);
                sibling.toBlack();
                parent.toRed();
                sibling = parent.left!;
            }
            if (isBlack(sibling.left) && isBlack(sibling.right)) {
                const parentIsBlack = parent.isBlack;
                sibling.toRed();
                parent.toBlack();
                parentIsBlack && this.afterRemove(parent);
            } else {
                if (isBlack(sibling.left)) {
                    this.rotateL(sibling);
                    sibling = sibling.parent!;
                }
                this.rotateR(parent);
                sibling.toColor(parent.color);
                sibling.left?.toBlack();
                parent.toBlack();
            }
        }
    }
    private successor(node: RBTreeNode2<T>): RBTreeNode2<T> | null {
        if (node.right !== null) {
            let successor = node.right;
            while (successor.left) successor = successor.left;
            return successor;
        }
        let successor = node;
        while (successor.parent !== null && successor.parent.right === successor)
            successor = successor.parent;
        return successor;
    }
    private rotateL(grand: RBTreeNode2<T>) {
        const root = grand.parent;
        const parent = grand.right!;
        if (root === null) this._root = parent;
        else {
            const pos = root.left === grand ? 'left' : 'right';
            root[pos] = parent;
        }
        grand.right = parent.left;
        if (parent.left) parent.left.parent = grand;
        parent.left = grand;
        grand.parent = parent;
        parent.parent = root;
    }
    private rotateR(grand: RBTreeNode2<T>) {
        const root = grand.parent;
        const parent = grand.left!;
        if (root === null) this._root = parent;
        else {
            const pos = root.left === grand ? 'left' : 'right';
            root[pos] = parent;
        }
        grand.left = parent.right;
        if (parent.right) parent.right.parent = grand;
        parent.right = grand;
        grand.parent = parent;
        parent.parent = root;
    }
    print(): string {
        return this.root === null ? '' : this._print(this.root);
    }
    private _print(node: RBTreeNode2<T>, prefix = ''): string {
        const left = node.left;
        const right = node.right;
        const nodeStr = node.toString();
        const halfLength = (nodeStr.length + (prefix === '' ? 0 : 3)) >> 1;
        const blankStr = repeat(' ', halfLength);
        const lineStr = repeat('─', halfLength);
        prefix += blankStr;
        let str = nodeStr + `\n`;
        if (right !== null) {
            str +=
                prefix +
                (left === null ? '└' : '├') +
                lineStr +
                ' R ' +
                this._print(right, `${prefix}${left === null ? ' ' : '│'}${blankStr}`);
        }
        if (left !== null) {
            str += `${prefix}└${lineStr}` + ' L ' + this._print(left, `${prefix}${blankStr} `);
        }
        return str;
    }
    levelOrder(): T[] {
        const list: T[] = [];
        if (this.root === null) return list;
        const queue: RBTreeNode2<T>[] = [this.root];
        while (queue.length !== 0) {
            const node = queue.shift()!;
            list.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        return list;
    }
}
