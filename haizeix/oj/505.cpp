#include <algorithm>
#include <iostream>

using namespace std;

bool comp(const string &a, const string &b) { return a + b > b + a; }

int main() {
    int n;
    cin >> n;
    string str[n];
    for (int i = 0; i < n; i++) {
        cin >> str[i];
    }
    sort(str, str + n, comp);
    for (int i = 0; i < n; i++) {
        cout << str[i];
    }
    cout << endl;
    return 0;
}
