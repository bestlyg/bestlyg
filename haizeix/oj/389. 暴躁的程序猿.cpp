#include <algorithm>
#include <iostream>

using namespace std;

int check(int *nums, int m, int cnt) {
    int ans = 1, prev = 0;
    for (int i = 1; i < m; i++) {
        if (nums[i] - nums[prev] >= cnt) {
            ans++;
            prev = i;
        }
    }
    return ans;
}

int main() {
    int m, n, nums[100005];
    cin >> m >> n;
    for (int i = 0; i < m; i++) cin >> nums[i];
    sort(nums, nums + m);
    int l = 1, r = nums[m - 1] - nums[0];
    while (l < r) {
        int mid = (l + r + 1) >> 1;
        if (check(nums, m, mid) < n)
            r = mid - 1;
        else
            l = mid;
    }
	 cout << l << endl;
    return 0;
}
