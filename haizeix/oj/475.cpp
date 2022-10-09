#include <iostream>
#include <algorithm>

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
string divide(string num1, string num2) {
    string current = "", ans = "";
    for (int i = 0; i < num1.size(); i++) {
        current += num1[i];
        // cout << "===\ni = " << i << ", current = " << current << endl;
        // cout << "isbig : num1 = " << current <<", num2 = " << num2 << ", res = " << isBiggerOrEqual(current, num2) << endl;
        if (!isBiggerOrEqual(current, num2)) {
            if (ans != "") ans += "0";
            continue;
        }
        int j = 0;
        while (isBiggerOrEqual(current, multiply(num2, to_string(j + 1)))) j++;
        // cout << "j = " << j << ", mul = " << multiply(num2, to_string(j)) << endl;
        ans += to_string(j);
        // cout << "current = " << current << ", mul = " << multiply(num2, to_string(j)) << ", sub = " << substract(current, multiply(num2, to_string(j))) << endl;
        current = substract(current, multiply(num2, to_string(j)));
        // cout << "current = " << current 
        //      << ", mul = " << multiply(num2, to_string(j)) 
        //      << ", ans = " << ans
        //      << endl;
    }
    return ans == "" ? "0" : ans;
}

int main() {
    string num1, num2;
    cin >> num2 >> num1;
    cout << divide(num1, num2) << endl;
    return 0;
}

