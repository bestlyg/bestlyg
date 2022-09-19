#include <algorithm>
#include <iostream>

using namespace std;

long long cut(int cnt, int n, int *nums) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int num = nums[i] / cnt;
        sum += num;
    };
    return sum;
}

int main() {
    int m, n, nums[100005];
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    sort(nums, nums + n);
    long long mid, l = 1, r = nums[n - 1];
    while (l < r) {
        mid = (l + r) >> 1;
        if (cut(mid, n, nums) <= m)
            r = mid;
        else
            l = mid + 1;
    }
    cout << l - 1 << endl;
    return 0;
}
