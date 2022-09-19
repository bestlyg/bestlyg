#include <iostream>
using namespace std;
int check(int v1, int v2, int v3) {
    return v1 + v2 > v3 && v1 + v3 > v2 && v2 + v3 > v1;
}
int main() {
    int n, ans = 0;
    cin >> n;
    for (int i = 1; i < n; i++) {
        for (int j = i; n - j - i >= j; j++) {
            if (check(i, j, n - i - j)) ans++;
        }
    }
    cout << ans << endl;
    return 0;
}
