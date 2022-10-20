#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int ans = 0, cur = 1, day = 1;
    while (day <= n) {
        ans += cur * cur;
        day += cur;
        cur += 1;
    }
    cout << ans - (day - n - 1) * (cur - 1) << endl;
    return 0;
}
