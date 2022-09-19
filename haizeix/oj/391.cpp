#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
long long check(long long *nums, int n, long long cnt) {
    int ans = 0;
    long long val = 0;
    for (int i = 0; i < n; i++) {
        if (val + nums[i] >= cnt) {
            ans++;
            val = 0;
        }
        val += nums[i];
        // cout << "new val = " << val << ", i = " << i << ", ans = " << ans
        //      << endl;
    }
    if (val) ans++;
    // cout << "cnt = " << cnt << ", ans = " << ans << endl;
    return ans;
}
int main() {
    int n, m;
    long long l = 100000000, r = 0, nums[1000005], mid;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
        l = min(l, nums[i]);
        r += nums[i];
    }
    while (l < r) {
        mid = (l + r + 1) >> 1;
        if (check(nums, n, mid) <= m)
            r = mid - 1;
        else
            l = mid;
        // cout << "l = " << l << ", r = " << r << ", mid = " << mid << endl;
    }
    cout << l << endl;
    return 0;
}
