#include <iostream>
#include <unordered_set>
using namespace std;
class Node{
public:
    char val;
    Node *next, *prev;
    Node(char val): Node(val, nullptr, nullptr) {}
    Node(char val, Node *next): Node(val, next, nullptr){}
    Node(char val, Node *next, Node *prev): val(val), next(next), prev(prev){}
};
int main(){
    int cnt;
    string s;
    cin >> s >> cnt;
    Node *head = new Node('\0'), *tail = new Node('\0', nullptr, head);
    head->next = tail;
    for (auto &c : s) {
        Node *node = new Node(c, tail, tail->prev);
        tail->prev->next = node;
        tail->prev = node;
    }
    Node *p = tail;
    char c;
    for (int i = 0; i < cnt; i++) {
        cin >> c;
        if (c == 'B' && p != head->next) {
            Node *node = p->prev;
            node->prev->next = node->next;
            node->next->prev = node->prev;
            delete node;
        } else if (c == 'L' && p != head->next) {
            p = p->prev;
        } else if (c == 'D' && p != tail) {
            p = p->next;
        } else if (c == 'P') {
            cin >> c;
            if (p == head) p = p->next;
            Node *node = new Node(c, p, p->prev);
            node->next->prev = node;
            node->prev->next = node;
        }
    }
    p = head;
    while (p->next && p->next->val) {
        cout << p->next->val;
        p = p->next;
    }
    cout << endl;
    return 0;
}
