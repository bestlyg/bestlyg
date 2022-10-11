#include <algorithm>
#include <functional>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

string n2s(int num) {
    string ans = "";
    while (num) {
        ans += num % 10 + '0';
        num /= 10;
    }
    reverse(ans.begin(), ans.end());
    return ans;
}
/**
 * @param ans 结果数组
 * @param nums 数据
 * @param n 数据数量
 * @param m 枚举数量
 * @param start 起始点
 * @param str 当前字符串
 */
void load(vector<string> &ans, int *nums, int n, int m, int start, string str) {
    // cout << "n = " << n << ", m = " << m << ", start = " << start
    //      << ", str = " << str << endl;
    if (start == n) return;
    if (str != "") str += " ";
    str += n2s(nums[start]);
    if (m == 1) {
        ans.push_back(str);
        return;
    }
    for (int j = start + 1; j < n; j++) {
        load(ans, nums, n, m - 1, j, str);
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    int nums[n];
    for (int i = 1; i <= n; i++) nums[i - 1] = i;
    vector<string> ans;
    for (int i = 0; i < n; i++) {
        load(ans, nums, n, m, i, "");
    }
    for (int i = 0; i < ans.size(); i++) {
        cout << ans[i] << endl;
    }
    return 0;
}
