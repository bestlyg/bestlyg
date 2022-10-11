#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
int check(double *nums, double n, double cnt) {
    int ans = 0;
    for (int i = 0; i < n; i++) {
        ans += floor(nums[i] / cnt);
        // cout << "i = " << i << ", nums[i] = " << nums[i] << ", cnt = " << cnt
        //      << ", floor = " << floor(nums[i] / cnt) << ", ans = " << ans
        //      << endl;
    }
    // cout << "cnt = " << cnt << ", ans = " << ans << endl;
    return ans;
}

int main() {
    int n, k;
    double nums[100005];
    cin >> n >> k;
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums, nums + n);
    // for (int i = 0; i < n; i++) cout << nums[i] << ' ';
    // cout << endl;
    double l = 1, r = nums[n - 1], m;
    while (r - l > 0.00001) {
        m = (l + r) / 2;
        // cout << "l = " << l << ", r = " << r << ", m = " << m << endl;
        if (check(nums, n, m) < k)
            r = m;
        else
            l = m;
    }
    printf("%.2lf\n", floor(l * 100) / 100);
    return 0;
}
