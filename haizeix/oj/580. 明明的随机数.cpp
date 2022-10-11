#include <algorithm>
#include <iostream>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int main() {
    int n, num;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        cin >> num;
        s.insert(num);
    }
    cout << s.size() << endl;
    for (auto it = s.begin(); it != s.end(); it++) {
        cout << *it << ' ';
    }
    return 0;
}
