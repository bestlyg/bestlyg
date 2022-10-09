#include <iostream>
#include <algorithm>

using namespace std;

string add(string num1, string num2) {
    string num3 = "";
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());
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
    reverse(num3.begin(), num3.end());
    return num3;
}

int main() {
    string num1, num2;
    cin >> num1 >> num2;
    cout << add(num1, num2) << endl;
    return 0;
}

