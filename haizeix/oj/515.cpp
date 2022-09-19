#include <algorithm>
#include <iostream>

using namespace std;

int gcd(int a, int b) {
    if (b) return gcd(b, a % b);
    return a;
}

int main() {
    int a, b, l;
    cin >> a >> b >> l;
    double true_v = 1.0 * a / b;
    int ans[2] = {l, 1};
    for (int i = 1; i <= l; i++) {
        for (int j = 1; j <= l; j++) {
            if (gcd(i, j) != 1) continue;
            double cur_v = 1.0 * i / j;
            if (cur_v < true_v) continue;
            if (1.0 * ans[0] / ans[1] > cur_v) {
                ans[0] = i;
                ans[1] = j;
            }
        }
    }
    printf("%d %d\n", ans[0], ans[1]);
    return 0;
}
