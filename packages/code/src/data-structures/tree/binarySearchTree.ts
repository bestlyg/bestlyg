import { BinaryTree, BinaryTreeNode } from './binaryTree';

export interface IBinarySearchTree<T> {
    /** 树中值的数量 */
    size: number;
    /** 树是否为空 */
    empty: boolean;
    /** 清空树 */
    clear(): void;
    /** 添加元素 */
    add(val: T): void;
    /** 删除元素 */
    remove(val: T): void;
    /** 是否包含某个元素 */
    contains(val: T): boolean;
}
export class BinarySearchTree<T> extends BinaryTree<T> implements IBinarySearchTree<T> {
    protected createNode(
        val: T,
        parent: BinaryTreeNode<T> | null = null,
        left: BinaryTreeNode<T> | null = null,
        right: BinaryTreeNode<T> | null = null,
    ): BinaryTreeNode<T> {
        return new BinaryTreeNode(val, parent, left, right);
    }
    add(val: T) {
        // 如果根节点为空则直接赋值给根节点
        if (this.root === null) {
            this.afterAdd((this.root = this.createNode(val)));
        } else {
            let node = this.root;
            let pos: 'left' | 'right' = 'left';
            while (node !== null) {
                const compare = this.compare(node.val, val);
                if (compare > 0) {
                    if (node.left === null) break;
                    node = node.left;
                } else if (compare < 0) {
                    if (node.right === null) {
                        pos = 'right';
                        break;
                    }
                    node = node.right;
                } else {
                    // 比较值相等时，直接进行覆盖，防止val为引用类型
                    node.val = val;
                    return;
                }
            }
            this.afterAdd((node[pos] = this.createNode(val, node)));
        }
        this._size++;
    }
    protected afterAdd(_: BinaryTreeNode<T>) {}
    remove(val: T) {
        if (this.root === null) return;
        // 寻找compare为0的node值
        let node: BinaryTreeNode<T> | null = this.findNode(val);
        // 如果不存在该node直接返回
        if (node === null) return;
        this._size--;
        if (node.degree === 2) {
            const successor = node.successor()!;
            [node.val, successor.val] = [successor.val, node.val];
            node = successor;
        }
        // 如果node度为0
        if (node.degree === 0) {
            // 如果为根节点则直接清空
            if (node === this.root) this.root = null;
            else node.remove();
            this.afterRemove(node);
            return;
        }
        // 如果node度为1
        //如果为根节点
        const nextNode = node.left ?? node.right!;
        if (node.parent === null) {
            this.root = nextNode;
            nextNode.parent = null;
        }
        // 否则父节点赋值给子节点
        else {
            node.parent[node.childPosition] = nextNode;
            nextNode.parent = node.parent;
        }
        this.afterRemove(nextNode);
    }
    protected afterRemove(_: BinaryTreeNode<T>) {}
    contains(val: T) {
        return this.findNode(val) !== null;
    }
    private findNode(val: T): BinaryTreeNode<T> | null {
        if (this.empty) return null;
        let node = this.root;
        while (node !== null) {
            const compare = this.compare(node.val, val);
            if (compare > 0) node = node.left;
            else if (compare < 0) node = node.right;
            else return node;
        }
        return null;
    }
}
