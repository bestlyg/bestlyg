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

void load(vector<string> &ans, int *nums, int n, int start, string str) {
    if (start == n) return;
    if (str != "") str += " ";
    str += n2s(nums[start]);
    ans.push_back(str);
    for (int j = start + 1; j < n; j++) {
        load(ans, nums, n, j, str);
    }
}

int main() {
    int n;
    cin >> n;
    int nums[n];
    for (int i = 1; i <= n; i++) nums[i - 1] = i;
    vector<string> ans;
    for (int i = 0; i < n; i++) {
        load(ans, nums, n, i, "");
    }
    for (int i = 0; i < ans.size(); i++) {
        cout << ans[i] << endl;
    }
    return 0;
}
