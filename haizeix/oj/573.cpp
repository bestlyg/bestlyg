#include <algorithm>
#include <functional>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

struct person {
    int name, interval, next;
    bool operator>(const person &b) const {
        return this->next != b.next ? this->next > b.next : this->name > b.name;
    }
};

int main() {
    priority_queue<person, vector<person>, greater<person>> q;
    string op;
    while (1) {
        cin >> op;
        if (op == "#") break;
        person p;
        cin >> p.name >> p.interval;
        p.next = p.interval;
        // printf("person : name = %d, interval = %d, next = %d\n", p.name,
        //        p.interval, p.next);
        q.push(p);
    }
    int k, ans = 0;
    cin >> k;
    while (k--) {
        person p = q.top();
        q.pop();
        cout << p.name << endl;
        p.next += p.interval;
        // printf("k = %d, person : name = %d, interval = %d, next = %d\n", k,
        //        p.name, p.interval, p.next);
        q.push(p);
    }
    return 0;
}
