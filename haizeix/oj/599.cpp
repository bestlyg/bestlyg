#include <iostream>

using namespace std;

int main() {
    int n, t, nums[1000005];
    cin >> n >> t;
    for (int i = 0; i < n; i++) cin >> nums[i];
    for (int i = 0; i < n; i++) {
        int num = nums[i], f = 0, l = i + 1, r = n - 1, m;
        // cout << "======" << endl << "i = " << i << endl;
        while (l <= r) {
            m = (l + r) >> 1;
            // cout << "l = " << l << ", r = " << r << ", m = " << m
            //      << ", nums[m] = " << nums[m] << endl;
            if (nums[m] == t - num) {
                cout << i << ' ' << m << endl;
                m = l;
                f = 1;
                break;
            }
            if (nums[m] > t - num)
                r = m - 1;
            else
                l = m + 1;
        }
        if (f) break;
    }
    return 0;
}
