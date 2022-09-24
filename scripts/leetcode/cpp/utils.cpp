class Node{
public:
    int val;
    Node *next;
    Node(int val): Node(val, nullptr) {}
    Node(int val, Node *next): val(val), next(next){}
};
class Node{
public:
    int val;
    Node *next, *prev;
    Node(int val): Node(val, nullptr, nullptr) {}
    Node(int val, Node *next): Node(val, next, nullptr){}
    Node(int val, Node *next, Node *prev): val(val), next(next), prev(prev){}
};