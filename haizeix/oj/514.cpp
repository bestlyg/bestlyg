#include <algorithm>
#include <iostream>

using namespace std;

int cnts[10] = {6, 2, 5, 5, 4, 5, 6, 3, 7, 6};

int get_cnt(int num) {
    if (num < 10) return cnts[num];
    int ans = 0;
    while (num) {
        ans += cnts[num % 10];
        num /= 10;
    }
    return ans;
}

int main() {
    int n;
    cin >> n;
    if (n < 8) {
        cout << 0 << endl;
        return 0;
    }
    int ans = 0;
    n -= 4;
    for (int i = 0; i <= 1000; i++) {
        for (int j = 0; j <= 1000; j++) {
            if (get_cnt(i) + get_cnt(j) + get_cnt(i + j) == n) {
                ans++;
            }
        }
    }
    cout << ans << endl;
    return 0;
}
