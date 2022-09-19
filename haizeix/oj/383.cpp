#include <algorithm>
#include <iostream>
#include <queue>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int main() {
    queue<int> male, female;
    int x, y, n;
    cin >> x >> y >> n;
    for (int i = 1; i <= x; i++) male.push(i);
    for (int i = 1; i <= y; i++) female.push(i);
    for (int i = 0; i < n; i++) {
        x = male.front();
        male.pop();
        y = female.front();
        female.pop();
        cout << x << ' ' << y << endl;
        male.push(x);
        female.push(y);
    }
    return 0;
}
