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
    vector<string> list(n + 1, "");
    list[1] = "0"; 
    if (n >= 2) list[2] = "1"; 
    if (n >= 3) list[3] = "1";
    for (int i = 4; i <= n; i++) {
        list[i] = add(list[i], list[i - 2]);
        list[i] = add(list[i], list[i - 3]);
    }
    cout << list[n] << endl;
    return 0;
}

