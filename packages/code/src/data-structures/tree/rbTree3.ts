/* istanbul ignore file */
import { repeat } from 'lodash';
import { IRBTree } from './rbTree';
const RED = true;
const BLACK = false;
type Color = boolean;
const isRed = (node: RBTreeNode3<any> | null) => node?.color === RED;
const isBlack = (node: RBTreeNode3<any> | null) => node === null || node?.color === BLACK;
const setColor = (node: RBTreeNode3<any> | null, color: Color) => {
    if (node) node.color = color;
};
const setRed = (node: RBTreeNode3<any> | null) => setColor(node, RED);
const setBlack = (node: RBTreeNode3<any> | null) => setColor(node, BLACK);
export class RBTreeNode3<T> {
    color = RED;
    left: RBTreeNode3<T> | null = null;
    right: RBTreeNode3<T> | null = null;
    constructor(public val: T, public parent: RBTreeNode3<any> | null = null) {}
    toString() {
        return this.val + (isRed(this) ? '(R)' : '');
    }
}
export class RBTree3<T> implements IRBTree<T> {
    private _size = 0;
    get size() {
        return this._size;
    }
    get empty() {
        return this._size === 0;
    }
    private root: RBTreeNode3<T> | null = null;
    constructor(private compare: (k1: T, k2: T) => number) {}
    clear() {
        this.root = null;
        this._size = 0;
    }
    contains(key: T) {
        return this.findNode(key) !== null;
    }
    add(key: T) {
        let node = this.findNode(key);
        if (this.root === null) {
            this.root = node = new RBTreeNode3<T>(key);
        } else {
            let parent = this.root;
            let pos = 'left';
            while (parent !== null) {
                const compare = this.compare(parent.val, key);
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
            parent[pos] = node = new RBTreeNode3<T>(key, parent);
        }
        this._size++;
        this.afterSet(node);
    }
    private afterSet(node: RBTreeNode3<T>) {
        let parent = node.parent;
        if (parent === null) {
            setBlack(node);
            return;
        }
        if (isBlack(parent)) return;
        const grand = parent.parent!;
        const sibling = grand.left === parent ? grand.right! : grand.left!;
        if (isRed(sibling)) {
            setBlack(parent);
            setBlack(sibling);
            setRed(grand);
            this.afterSet(grand);
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
        setBlack(parent);
        setRed(node);
        setRed(grand);
    }
    remove(key: T) {
        let node = this.findNode(key);
        if (node === null) return;
        if (node.left !== null && node.right !== null) {
            const successor = this.successor(node);
            [node.val, successor.val] = [successor.val, node.val];
            node = successor;
        }
        const parent = node.parent!;
        this._size--;
        if (node.left === null && node.right === null) {
            if (this.root === node) {
                this.clear();
                return;
            }
            const pos = parent.left === node ? 'left' : 'right';
            parent[pos] = null;
            this.afterRemove(node);
            return;
        }
        const childNode = node.left ?? node.right!;
        if (parent === null) this.root = childNode;
        else {
            const pos = parent.left === node ? 'left' : 'right';
            parent[pos] = childNode;
        }
        childNode.parent = parent;
        this.afterRemove(childNode);
    }
    private afterRemove(node: RBTreeNode3<T>) {
        if (isRed(node)) {
            setBlack(node);
            return;
        }
        const parent = node.parent;
        if (parent === null) return;
        const leftChild = parent.left === null || parent.left === node;
        let sibling = leftChild ? parent.right! : parent.left!;
        if (leftChild) {
            if (isRed(sibling)) {
                this.rotateL(parent);
                setBlack(sibling);
                setRed(parent);
                sibling = parent.right!;
            }
            if (isBlack(sibling.left) && isBlack(sibling.right)) {
                const parentIsBlack = isBlack(parent);
                setRed(sibling);
                setBlack(parent);
                parentIsBlack && this.afterRemove(parent);
                return;
            }
            if (isBlack(sibling.right)) {
                this.rotateR(sibling);
                sibling = sibling.parent!;
            }
            this.rotateL(parent);
            setColor(sibling, parent.color);
            setBlack(parent);
            setBlack(sibling.right);
        } else {
            if (isRed(sibling)) {
                this.rotateR(parent);
                setBlack(sibling);
                setRed(parent);
                sibling = parent.left!;
            }
            if (isBlack(sibling.left) && isBlack(sibling.right)) {
                const parentIsBlack = isBlack(parent);
                setRed(sibling);
                setBlack(parent);
                parentIsBlack && this.afterRemove(parent);
                return;
            }
            if (isBlack(sibling.left)) {
                this.rotateL(sibling);
                sibling = sibling.parent!;
            }
            this.rotateR(parent);
            setColor(sibling, parent.color);
            setBlack(parent);
            setBlack(sibling.left);
        }
    }
    private successor(node: RBTreeNode3<T>) {
        let successor = node.right!;
        while (successor.left) successor = successor.left;
        return successor;
    }
    private findNode(key: T, root = this.root): RBTreeNode3<T> | null {
        if (root === null) return null;
        const compare = this.compare(root.val, key);
        if (compare > 0) return this.findNode(key, root.left);
        if (compare < 0) return this.findNode(key, root.right);
        return root;
    }
    private rotateL(grand: RBTreeNode3<T>) {
        const root = grand.parent;
        const parent = grand.right!;
        if (root === null) this.root = parent;
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
    private rotateR(grand: RBTreeNode3<T>) {
        const root = grand.parent;
        const parent = grand.left!;
        if (root === null) this.root = parent;
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
    private _print(node: RBTreeNode3<T>, prefix = ''): string {
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
        const queue: RBTreeNode3<T>[] = [this.root];
        while (queue.length !== 0) {
            const node = queue.shift()!;
            list.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        return list;
    }
}
