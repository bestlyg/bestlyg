#include <stdio.h>
#include <stdlib.h>

#ifdef D
#define log(frm, args...) \
    { printf(frm, ##args); }
#else
#define log(frm, args...)
#endif

typedef struct Node {
    int key, color;  // red 0, black 1, double black 2
    struct Node *lchild, *rchild;
} Node;

Node *createNode(int key);

Node *NIL;
void initNIL() {
    NIL = createNode(0);
    NIL->key = 0;
    NIL->color = 1;
    NIL->lchild = NIL;
    NIL->rchild = NIL;
}

void printNode(Node *root, int init) {
    if (root == NIL) return;
    if (init) printf("===[RBTree Print]===\n");
    printf("%d, (%d, %d)\n", root->key, root->lchild->key, root->rchild->key);
    printNode(root->lchild, 0);
    printNode(root->rchild, 0);
}

Node *createNode(int key) {
    Node *root = (Node *)malloc(sizeof(Node *));
    root->key = key;
    root->color = 0;
    root->lchild = root->rchild = NIL;
    return root;
}

void freeNode(Node *root) {
    if (root == NIL) return;
    freeNode(root->lchild);
    freeNode(root->rchild);
    free(root);
}

int hasRedChild(Node *root) {
    return root->lchild->color == 0 || root->rchild->color == 0;
}

Node *rotateNode_L(Node *root) {
    Node *newNode = root->rchild;
    root->rchild = newNode->lchild;
    newNode->lchild = root;
    return newNode;
}
Node *rotateNode_R(Node *root) {
    Node *newNode = root->lchild;
    root->lchild = newNode->rchild;
    newNode->rchild = root;
    return newNode;
}

Node *insertNode_Maintain(Node *root) {
    log("insertNode_Maintain, root = %d\n", root->key);
    // 如果没有红孩子，直接返回
    if (!hasRedChild(root)) return root;
    log("has red child\n");
    // 如果红孩子没有红孩子， 直接返回
    if (!(root->lchild->color == 0 && hasRedChild(root->lchild)) &&
        !(root->rchild->color == 0 && hasRedChild(root->rchild)))
        return root;
    log("red child has red child\n");
    // 右侧是红， 兄弟是黑的
    if (root->lchild->color == 1) {
        // 红的左侧是红， 右旋调成一样的
        if (root->rchild->lchild->color == 0) {
            log("RL\n");
            root->rchild = rotateNode_R(root->rchild);
        } else
            log("RR\n");
        root = rotateNode_L(root);
    } else if (root->rchild->color == 1) {  // 跟上面对称
        if (root->lchild->rchild->color == 0) {
            root->lchild = rotateNode_L(root->lchild);
            log("LR\n");
        } else
            log("LL\n");
        root = rotateNode_R(root);
    }
    // 调整成红黑黑
    root->color = 0;
    root->lchild->color = root->rchild->color = 1;
    return root;
}

Node *_insertNode(Node *root, int key) {
    log("insertNode, root = %d, key = %d\n", root->key, key);
    if (root == NIL) return createNode(key);
    if (root->key == key) return root;
    if (root->key > key)
        root->lchild = _insertNode(root->lchild, key);
    else if (root->key < key)
        root->rchild = _insertNode(root->rchild, key);
    return insertNode_Maintain(root);
}

Node *insertNode(Node *root, int key) {
    root = _insertNode(root, key);
    root->color = 1;
    return root;
}

Node *eraseNode_Maintain(Node *root) {
    // 没双黑 直接返回
    if (root->lchild->color != 2 && root->rchild->color != 2) return root;
    // 如果双黑的兄弟是红的
    if (hasRedChild(root)) {
        // 记录是左红(0)还是右红(1)
        int type = 0;
        // 原根染红
        root->color = 0;
        if (root->lchild->color == 0)
            root = rotateNode_R(root);
        else
            root = rotateNode_L(root), type = 1;
        // 新根染黑
        root->color = 1;
        // 如果左红在右侧维护
        // 如果右红在左侧维护
        if (type == 1)
            root->lchild = eraseNode_Maintain(root->lchild);
        else
            root->rchild = eraseNode_Maintain(root->rchild);
        return root;
    }
    // 如果双黑的兄弟没有红孩子
    if ((root->lchild->color == 1 && !hasRedChild(root->lchild)) ||
        (root->rchild->color == 1 && !hasRedChild(root->rchild))) {
        // 两兄弟-1，根+1
        root->color += 1;
        root->lchild->color -= 1;
        root->rchild->color -= 1;
        return root;
    }
    // 如果左侧是黑的
    if (root->lchild->color == 1) {
        // 如果左侧的左侧没有红
        if (root->lchild->lchild->color != 0) {
            // 原左变红
            root->lchild->color = 0;
            root->lchild = rotateNode_L(root->lchild);
            // 新左变黑
            root->lchild->color = 1;
        }
        // 新根变成root色
        root->lchild->color = root->color;
        // 协调双黑
        root->rchild->color = 1;
        root = rotateNode_R(root);
    } else {  // 跟上面对称
        if (root->rchild->rchild->color != 0) {
            root->rchild->color = 0;
            root->rchild = rotateNode_R(root->rchild);
            root->rchild->color = 1;
        }
        root->rchild->color = root->color;
        root->lchild->color = 1;
        root = rotateNode_L(root);
    }
    // 新根孩子染黑
    root->lchild->color = root->rchild->color = 1;
    return root;
}

Node *_eraseNode(Node *root, int key) {
    if (root == NIL) return root;
    if (root->key > key)
        root->lchild = _eraseNode(root->lchild, key);
    else if (root->key < key)
        root->rchild = _eraseNode(root->rchild, key);
    else {
        // 如果有0或1个孩子
        if (root->lchild == NIL || root->rchild == NIL) {
            // 找唯一子孩子，没有的话，拿到的就是NIL
            Node *temp = root->lchild == NIL ? root->rchild : root->lchild;
            // 如果删的是红色的，NIL + 0 无影响
            // 如果删的是黑色的， 且无孩子，NIL + 0 变双黑
            // 如果删的是黑色的， 且有红孩子， 0 + 1变黑
            temp->color += root->color;
            free(root);
            return temp;
        } else {
            // 如果有2个孩子 找前驱
            Node *temp = root->lchild;
            while (temp->rchild != NIL) temp = temp->rchild;
            root->key = temp->key;
            root->lchild = _eraseNode(root->lchild, temp->key);
        }
    }
    return eraseNode_Maintain(root);
}
Node *eraseNode(Node *root, int key) {
    root = _eraseNode(root, key);
    root->color = 1;
    return root;
}

// 出问题的红色，兄弟是红色
void testInsert1(Node *root) {}
// 出问题的红色，兄弟是黑色
void testInsert2(Node *root) {}
// 出问题的双黑，兄弟是红色
void testErase1(Node *root) {}
// 出问题的双黑在左边，兄弟是黑色且兄弟右侧有红
void testErase2(Node *root) {}
// 出问题的双黑在左边，兄弟是黑色且兄弟左侧有红
void testErase3(Node *root) {}
// 出问题的双黑在左边，兄弟是黑色且兄弟无红孩子
void testErase4(Node *root) {}

int main() {
    initNIL();
    printf("INIT NIL : key = %d, color = %d, left = %d, right = %d\n", NIL->key,
           NIL->color, NIL->lchild == NIL, NIL->rchild == NIL);
    return 0;
}
