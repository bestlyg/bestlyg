#include <algorithm>
#include <iostream>
#include <queue>

using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0, num = 1;
    queue<int> q;
    while (num <= n) {
        while (num <= n && sum < n) {
            sum += num;
            q.push(num);
            ++num;
            // cout << "num = " << num << ", qs = " << q.size() << ", sum = " << sum << endl;
        }
        if (sum == n) break;
        while (sum > n) {
            sum -= q.front();
            q.pop();
        }
    }
    while (q.size()) {
        cout << q.front();
        q.pop();
        if (q.size()) cout << ' ';
    }
    cout << endl;
    return 0;
}

