#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

string add(string num1, string num2) {
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());
    string ans = "";
    int add = 0;
    for (int i = 0; i < max(num1.size(), num2.size()); i++) {
        int num = add;
        add = 0;
        if (i < num1.size()) num += num1[i] - '0';
        if (i < num2.size()) num += num2[i] - '0';
        if (num >= 10) num -= 10, add = 1;
        ans += to_string(num);
    }
    if (add) ans += "1";
    reverse(ans.begin(), ans.end());
    int i = 0;
    while (i < ans.size() && ans[i] == '0') i++;
    if (i == ans.size()) return "";
    return ans.substr(i, ans.size() - i);
}
int main() {
    int n;
    cin >> n;
    vector<string> months(3);
    months[2] = "1";
    months[0] = months[1] = "0";
    while (--n) {
        string next_m[3];
        next_m[0] = add(months[2], months[1]);
        next_m[1] = months[0];
        next_m[2] = add(months[2], months[1]);
        for (int i = 0; i < 3; i++) months[i] = next_m[i];
        // cout << "n = " << n << ", m0 = " << months[0] << ", m1 = " << months[1] << ", m2 = " << months[2] << endl;
    }
    cout << add(add(months[0], months[1]), months[2]) << endl;
    return 0;
}

