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

int main() {
    priority_queue<int, vector<int>, greater<int>> q;
    int n, num;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> num;
        q.push(num);
    }
    int ans = 0;
    while (q.size() >= 2) {
        int num1 = q.top();
        q.pop();
        int num2 = q.top();
        q.pop();
        ans += num1 + num2;
        q.push(num1 + num2);
    }
    cout << ans << endl;
    return 0;
}
