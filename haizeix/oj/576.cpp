#include <algorithm>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int main() {
    unordered_map<string, long long *> dict;
    int n, k, money, cnt;
    string str;
    cin >> n >> k;
    for (int i = 0; i < n; i++) {
        cin >> str >> money >> cnt;
        // cout << "get str = " << str << ", cnt = " << cnt
        //      << ", money = " << money << endl;
        long long *nums = (long long *)malloc(sizeof(long long) * 2);
        nums[0] = money;
        nums[1] = cnt;
        dict[str] = nums;
    }
    long long ans = 0;
    for (int i = 1; i <= k; i++) {
        cin >> str >> cnt;
        // cout << "=========" << endl
        //      << "get str = " << str << ", cnt = " << cnt << endl
        //      << "money = " << dict[str][0] << ", cnt = " << dict[str][1]
        //      << endl;
        if (dict[str][1] >= cnt) {
            ans += cnt * dict[str][0];
            dict[str][1] -= cnt;
        } else {
            cout << -i << endl;
            return 0;
        }
    }
    cout << ans << endl;
    return 0;
}
