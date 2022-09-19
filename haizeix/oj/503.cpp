#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
int main() {
    int w, n, p[30005];
    cin >> w >> n;
    for (int i = 0; i < n; i++) cin >> p[i];
    sort(p, p + n);
    int left = 0, right = n - 1, ans = 0;
    // for (int i = 0; i < n; i++) cout << p[i] << ' ';
    // cout << endl;
    while (left < right) {
        // cout << "===============" << endl;
        // cout << "left = " << left << ", right = " << right << ", ans = " <<
        // ans
        //      << endl;
        while (left < right && p[right] + p[left] >= w) {
            if (p[right] + p[left] == w) left++;
            right--;
            ans++;
        }
        if (left >= right) break;
        // cout << "left = " << left << ", right = " << right << ", ans = " <<
        // ans
        //      << endl;
        int surplus = w - p[right] - p[left];
        while (left < right - 1 && p[left + 1] < surplus) {
            surplus -= p[++left];
        }
        ans++;
        left++;
        right--;
        // cout << "left = " << left << ", right = " << right << ", ans = " <<
        // ans
        //      << endl;
    }
    if (left == right) ans++;
    cout << ans << endl;
    return 0;
}
