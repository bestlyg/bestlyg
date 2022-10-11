#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
int check(int *nums, int n, int data) {
    // cout << "check" << endl;
    int ans = 0, prev = 0;
    for (int i = 1; i < n; i++) {
        if (nums[i] - nums[prev] < data)
            ans++;
        else
            prev = i;
    }
    // cout << "n = " << n << ", data = " << data << ", ans = " << ans << endl;
    return ans;
}
int main() {
    int l, m, n, nums[50005] = {0};
    cin >> l >> n >> m;
    nums[n + 1] = l;
    int left = 0, right = l, mid;
    for (int i = 1; i <= n; i++) cin >> nums[i];
    for (int i = 1; i <= n; i++) left = min(left, nums[i] - nums[i - 1]);
    while (left < right) {
        mid = (left + right + 1) >> 1;
        // cout << "left = " << left << ", right = " << right << ", mid = " <<
        // mid
        //      << endl;
        if (check(nums, n + 2, mid) > m)
            right = mid - 1;
        else
            left = mid;
    }
    cout << left << endl;
    return 0;
}
