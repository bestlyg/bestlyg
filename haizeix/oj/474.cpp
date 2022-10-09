#include <algorithm>
#include <iostream>
#include <string>

using namespace std;

string add(string num1, string num2) {
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
    return ans;
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
bool isBiggerOrEqual(const string num1, const string num2) {
    if (num1.size() > num2.size()) return true;
    if (num1.size() < num2.size()) return false;
    return num1 >= num2;
}
string substract(string num1, string num2) {
    if (num1 == num2) return "";
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());
    string ans = "";
    for (int i = 0; i < num1.size(); i++) {
        int n1 = num1[i] - '0', n2 = i < num2.size() ? num2[i] - '0' : 0;
        if (n1 < n2) {
            n1 += 10;
            int j = i + 1;
            while (num1[j] == '0') num1[j++] = '9';
            num1[j]--;
        }
        ans = to_string(n1 - n2) + ans;
    }
    int i = 0;
    while (i < ans.size() && ans[i] == '0') i++;
    if (i == ans.size()) return "";
    return ans.substr(i, ans.size() - i);
}

int main() {
    int n;
    string answer, tmp;
    cin >> n >> answer;
    int cnt0 = 0;
    string ans = "1";
    getline(cin, tmp);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < 4; j++) {
            cin >> tmp;
            if (j == answer[i] - 'A') {
                ans = multiply(ans, tmp.substr(0, tmp.size() - 1));
                cnt0 += 2;
                while (ans.back() == '0') {
                    ans.pop_back();
                    cnt0--;
                }
            }
        }
    }
    if (ans == "") {
        cout << "0" << endl;
    } else if (ans == "1") {
        cout << "1" << endl;
    } else {
        cout << "0.";
        for (int i = 0; i < cnt0 - ans.size(); i++) cout << '0';
        cout << ans << endl;
    }
    return 0;
}

