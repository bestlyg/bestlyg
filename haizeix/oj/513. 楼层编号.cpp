#include <algorithm>
#include <iostream>

using namespace std;

int check(int num, int t) {
    while (num) {
        if (num % 10 == t) return 1;
        num /= 10;
    }
    return 0;
}

int main() {
    int m, t;
    cin >> m >> t;
    int ans = 0;
    for (int i = 1; i <= m; i++) {
        if (check(i, t)) continue;
        ans++;
    }
    cout << ans << endl;
    return 0;
}
