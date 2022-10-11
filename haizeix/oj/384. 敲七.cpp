#include <algorithm>
#include <iostream>
#include <queue>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int check(int num) {
    if (num % 7 == 0) return 1;
    while (num) {
        if (num % 10 == 7) return 1;
        num /= 10;
    }
    return 0;
}

int main() {
    int n, x, t;
    cin >> n >> x >> t;
    queue<int> q;
    for (int i = x; i <= n; i++) q.push(i);
    for (int i = 1; i < x; i++) q.push(i);
    while (q.size() > 1) {
        int p = q.front();
        q.pop();
        if (check(t++)) continue;
        q.push(p);
    }
    cout << q.front() << endl;
    return 0;
}
