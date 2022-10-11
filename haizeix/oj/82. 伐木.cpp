#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
long long check(int *nums, int n, int cnt) {
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        ans += max(nums[i] - cnt, 0);
    }
    // cout << "cnt = " << cnt << ", ans = " << ans << endl;
    return ans;
}
int main() {
    int n, m, nums[1000005];
    cin >> n >> m;
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums, nums + n);
    long long l = 0, r = nums[n - 1], mid;
    while (l < r) {
        mid = (l + r + 1) >> 1;
        if (check(nums, n, mid) < m)
            r = mid - 1;
        else
            l = mid;
        // cout << "l = " << l << ", r = " << r << ", mid = " << mid << endl;
    }
    cout << l << endl;
    return 0;
}
