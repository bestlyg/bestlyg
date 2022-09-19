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

void load(vector<string> &ans, int *nums, int n, set<int> &s, string str) {
    if (s.size() == n) {
        ans.push_back(str);
        return;
    }
    for (int i = 0; i < n; i++) {
        if (s.count(nums[i])) continue;
        string next = str;
        if (str != "") next += ' ';
        next += nums[i] + '0';
        s.insert(nums[i]);
        load(ans, nums, n, s, next);
        s.erase(nums[i]);
    }
}

int main() {
    int n;
    cin >> n;
    int nums[n];
    for (int i = 1; i <= n; i++) nums[i - 1] = i;
    vector<string> ans;
    set<int> s;
    load(ans, nums, n, s, "");
    for (int i = 0; i < ans.size(); i++) {
        cout << ans[i] << endl;
    }
    return 0;
}
