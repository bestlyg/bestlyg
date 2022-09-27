#include <iostream>
using namespace std;
class Node{
public:
    int val;
    Node *next;
    Node(int val): Node(val, nullptr) {}
    Node(int val, Node *next): val(val), next(next){}
};
int main(){
    int n, m;
    cin >> n >> m;
    int size = n;
    Node *head = new Node(1), *tail = head;
    head->next = head;
    for (int i = 2; i <= n; i++) {
        Node *node = new Node(i, head);
        tail->next = node;
        tail = node;
    }
    Node *p = tail;
    while (size > 1) {
        for (int i = 0; i < m - 1; i++) p = p->next;
        // cout << "remove " << p->next->val << endl;
        p->next = p->next->next;
        size--;
    }
    cout << p->val << endl;
    return 0;
}
