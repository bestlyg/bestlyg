#include "bestlyg.h"

BESTLYG_NP_BEGIN(bestlyg)
BESTLYG_NP_BEGIN(rbtree)

class RBTreeNode {
public:
    int key, color;
    RBTreeNode *
    left, *
    right;
    RBTreeNode(int key): RBTreeNode(key, 0){}
    RBTreeNode(int key, int color): 
        key(key), color(color), left(&NIL), right(&NIL) {}
    
    static RBTreeNode NIL;
};

RBTreeNode::NIL = RBTreeNode(0, 1);

class RBTree {
};

void demo() {
    BESTLYG_PRINT(main_rbtree);
}

BESTLYG_NP_END(rbtree)
BESTLYG_NP_END(bestlyg)