#include <iostream>
#include <algorithm>

using namespace std;

string add(string num1, string num2) {
    string num3 = "";
    int add = 0;
    for (int i = 0; i < max(num1.size(), num2.size()); i++) {
        int num = add;
        add = 0;
        if (i < num1.size()) num += num1[i] - '0';
        if (i < num2.size()) num += num2[i] - '0';
        if (num >= 10) num -= 10, add = 1;
        num3 += to_string(num);
    }
    if (add) num3 += "1";
    return num3;
}

string multiply(string num, int m) {
    string ans = "";
    if (m == 0) return ans;
    int add = 0;
    for (int i = 0; i < num.size(); i++) {
        int next = (num[i] - '0') * m + add;
        add = 0;
        if (next >= 10) {
            add = next / 10;
            next = next % 10;
        }
        ans += to_string(next);
    }
    if (add) ans += to_string(add);
    // cout << "num = " << num << ", m = " << m << ", ans = " << ans << endl;
    return ans;
}
string multiply(string num1, string num2) {
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());
    string ans = "";
    for (int i = 0; i < num2.size(); i++) {
        string next = multiply(num1, num2[i] - '0');
        for (int j = 0; j < i; j++) next = "0" + next;
        ans = add(ans, next);
        // cout << "next = " << next << ", ans = " << ans << endl;
    }
    reverse(ans.begin(), ans.end());
    return ans;
}

int main() {
    string num1, num2;
    cin >> num1 >> num2;
    cout << multiply(num1, num2) << endl;
    return 0;
}

