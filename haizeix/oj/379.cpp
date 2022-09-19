#include <algorithm>
#include <iostream>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int main() {
    int n, op, val;
    stack<int> s_good, s_max;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> op;
        if (op == 0) {
            cin >> val;
            if (s_good.size() == 0 || s_max.top() <= val) s_max.push(val);
            s_good.push(val);
        } else if (op == 1) {
            if (s_good.size() == 0) continue;
            if (s_max.top() == s_good.top()) s_max.pop();
            s_good.pop();
        } else {
            if (s_good.size() == 0)
                cout << 0 << endl;
            else
                cout << s_max.top() << endl;
        }
    }
    return 0;
}
