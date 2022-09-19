#include <algorithm>
#include <cmath>
#include <iostream>

using namespace std;
int main() {
    int n;
    cin >> n;
    int nums[105], sum = 0, avg;
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
        sum += nums[i];
    }
    avg = sum / n;
    int ans = 0;
    for (int i = 0; i < n - 1; i++) {
        if (nums[i] < avg) {
            nums[i + 1] -= avg - nums[i];
            ans++;
        } else if (nums[i] > avg) {
            nums[i + 1] += nums[i] - avg;
            ans++;
        }
        nums[i] = avg;
    }
    cout << ans << endl;
    return 0;
}
