
#include <iostream>
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <vector>
#include <string>
using namespace std;
int to10(string num, int radix) {
    int ans = 0;
    for (int i = num.size() - 1; i >= 0; i--) {
        char c = num[i];
        int item = c >= 'A' && c <= 'Z' ? c - 'A' + 10 : c - '0';
        ans += pow(radix, num.size() - 1 - i) * item;
    }
    return ans;
}
int main(){
    string tmp;
    vector<int> list;
    while (cin >> tmp) {
        list.push_back(to10(tmp, 36));
    }
    sort(list.begin(), list.end());
    // for (auto &num : list) {
    //     cout << num << endl;
    // }
    int ans = 0x7fffffff;
    for (int i = 1; i < list.size(); i++) {
        // cout << "list[i] = " << list[i] << ", list[i-1] = " << list[i - 1] << ", sub = " << list[i] - list[i - 1] << endl;
        ans = min(ans, list[i] - list[i - 1]);
    }
    cout << ans << endl;
    return 0;
}
