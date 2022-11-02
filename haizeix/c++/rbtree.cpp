class RBTreeNode {
public:
    int key, color;
    RBTreeNode *left, *right;
    RBTreeNode(int key, int color = 0, RBTreeNode *left = RBTreeNode::NIL(), RBTreeNode *right = RBTreeNode::NIL()): 
        key(key), color(color), left(left), right(right) {}
    static RBTreeNode *_NIL;
    static RBTreeNode *NIL() {
        if (_NIL == nullptr) _NIL = new RBTreeNode(0, 1);
        return _NIL;
    }

};

class RBTree {
};

int main() {
    RBTreeNode node(1);
    return 0;
}
