let NIL: RBNode<any>;
class RBNode<T> {
  constructor(public key: T, public color = 0, public lchild = NIL, public rchild = NIL) {}
  hasRedChild() {
    return this.lchild.color === 0 || this.rchild.color === 0;
  }
}
NIL = new RBNode(0, 1);
class RBTree<T extends Array<any>> {
  root: RBNode<T> = NIL;
  constructor(public compare: (v1: T, v2: T) => number, public key2str?: (v: T) => string) {}
  print(node = this.root, init = true) {
    if (node == NIL) return;
    if (init) console.log('===[RBTree Print]===');
    console.log(
      `${this.key2str?.(node.key) ?? node.key}, (${
        this.key2str?.(node.lchild.key) ?? node.lchild.key
      }, ${this.key2str?.(node.rchild.key) ?? node.rchild.key})`
    );
    this.print(node.lchild, false);
    this.print(node.rchild, false);
  }
  rotateLeft(node: RBNode<T>) {
    const newNode = node.rchild;
    node.rchild = newNode.lchild;
    newNode.lchild = node;
    return newNode;
  }
  rotateRight(node: RBNode<T>) {
    const newNode = node.lchild;
    node.lchild = newNode.rchild;
    newNode.rchild = node;
    return newNode;
  }
  insert(key: T) {
    this.root = this._insert(this.root, key);
    this.root.color = 1;
  }
  _insert(node: RBNode<T>, key: T) {
    if (node === NIL) return new RBNode(key);
    const compare = this.compare(key, node.key);
    if (compare === 0) {
      node.key = key;
      return node;
    }
    if (compare > 0) node.rchild = this._insert(node.rchild, key);
    else node.lchild = this._insert(node.lchild, key);
    return this._insertMaintain(node);
  }
  _insertMaintain(node: RBNode<T>) {
    if (!node.hasRedChild()) return node;
    if (
      !(node.lchild.color === 0 && node.lchild.hasRedChild()) &&
      !(node.rchild.color === 0 && node.rchild.hasRedChild())
    )
      return node;
    if (node.lchild.color === 1) {
      if (node.rchild.lchild.color === 0) node.rchild = this.rotateRight(node.rchild);
      node = this.rotateLeft(node);
    } else if (node.rchild.color === 1) {
      if (node.lchild.rchild.color === 0) node.lchild = this.rotateLeft(node.lchild);
      node = this.rotateRight(node);
    }
    node.color = 0;
    node.lchild.color = node.rchild.color = 1;
    return node;
  }

  remove(key: T) {
    this.root = this._remove(this.root, key);
    this.root.color = 1;
  }
  _remove(node: RBNode<T>, key: T) {
    if (node == NIL) return node;
    const compare = this.compare(key, node.key);
    if (compare > 0) node.rchild = this._remove(node.rchild, key);
    else if (compare < 0) node.lchild = this._remove(node.lchild, key);
    else {
      if (node.lchild === NIL || node.rchild === NIL) {
        const tmp = node.lchild === NIL ? node.rchild : node.lchild;
        tmp.color += node.color;
        return tmp;
      } else {
        let tmp = node.lchild;
        while (tmp.rchild !== NIL) tmp = tmp.rchild;
        node.key = tmp.key;
        node.lchild = this._remove(node.lchild, tmp.key);
      }
    }
    return this._removeMaintain(node);
  }
  _removeMaintain(node: RBNode<T>) {
    if (node.lchild.color !== 2 && node.rchild.color !== 2) return node;
    if (node.hasRedChild()) {
      let type = 0;
      node.color = 0;
      if (node.lchild.color === 0) node = this.rotateRight(node);
      else (node = this.rotateLeft(node)), (type = 1);
      node.color = 1;
      if (type === 1) node.lchild = this._removeMaintain(node.lchild);
      else node.rchild = this._removeMaintain(node.rchild);
      return node;
    }
    if (
      (node.lchild.color === 1 && !node.lchild.hasRedChild()) ||
      (node.rchild.color === 1 && !node.rchild.hasRedChild())
    ) {
      node.color += 1;
      node.lchild.color -= 1;
      node.rchild.color -= 1;
      return node;
    }
    if (node.lchild.color === 1) {
      if (node.lchild.lchild.color !== 0) {
        node.lchild.color = 0;
        node.lchild = this.rotateLeft(node.lchild);
        node.lchild.color = 1;
      }
      node.lchild.color = node.color;
      node.rchild.color = 1;
      node = this.rotateRight(node);
    } else {
      if (node.rchild.rchild.color !== 0) {
        node.rchild.color = 0;
        node.rchild = this.rotateRight(node.rchild);
        node.rchild.color = 1;
      }
      node.rchild.color = node.color;
      node.lchild.color = 1;
      node = this.rotateLeft(node);
    }
    node.lchild.color = node.rchild.color = 1;
    return node;
  }
  successor(node: RBNode<T>) {
    let successor = NIL;
    if (node.rchild) {
      successor = node.rchild;
      while (successor.lchild) successor = successor!.lchild;
      return successor;
    }
    let tmp = this.root;
    while (tmp) {
      if (tmp.key > node.key) {
        successor = tmp;
        tmp = tmp.lchild;
      } else {
        tmp = tmp.rchild;
      }
    }
    return tmp;
  }
  check([start, end]: T): boolean {
    let node = this.root;
    while (node !== NIL) {
      if (node.key[0] >= end) node = node.lchild;
      else if (node.key[1] <= start) node = node.rchild;
      else break;
    }
    if (node === NIL) return true;
    console.log(`===\nstart = ${start}, end = ${end}`);
    console.log(node.key);
    let tmp = node;
    let cnt = 0;
    while (tmp !== NIL && tmp.key[1] > start) {
      if (cnt == 1) return false;
      cnt++;
      end = tmp.key[0];
      tmp = this.successor(tmp);
    }
    return true;
  }
}
class MyCalendarTwo {
  tree = new RBTree<number[]>(
    (v1, v2) => (v1[0] === v2[0] ? v1[0] - v2[0] : v1[1] - v2[1]),
    v => v === NIL.key ? `[0, 0]`:`[${v[0]},${v[1]}]`
  );
  book(start: number, end: number): boolean {
    const ans = this.tree.check([start, end]);
    if (ans) this.tree.insert([start, end]);
    this.tree.print();
    return ans;
  }
}

const list: [number, number][] = [
  [10, 20],
  [50, 60],
  [10, 40],
  [5, 15],
  [5, 10],
  [25, 55],
];
const obj = new MyCalendarTwo();
for (const item of list) {
  console.log(obj.book(...item));
}
