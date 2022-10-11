#include <algorithm>
#include <iostream>

using namespace std;

int main() {
    int n;
    cin >> n;
    int nums[n];
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums, nums + n);
    int ans = 0;
    for (int i = n - 1; i >= 0; i -= 2) {
        if (i == 0) {
            ans += nums[i];
            break;
        }
        if (i == 1) {
            ans += nums[i];
            break;
        }
        if (i == 2) {
            ans += nums[i] + nums[i - 1] + nums[i - 2];
            break;
        }
        ans += min(nums[1] + nums[0] + nums[i] + nums[1],
                   nums[i] + nums[0] + nums[i - 1] + nums[0]);
        // cout << "i = " << i << ", ans = " << ans
        //      << ", num1 = " << nums[1] + nums[0] + nums[i] + nums[1]
        //      << ", num2 = " << nums[i] + nums[0] + nums[i - 1] + nums[0]
        //      << endl;
    }
    cout << ans << endl;
    return 0;
}
