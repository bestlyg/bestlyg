#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    string s;
    cin >> s;
    int prev = -1, ans = 0;
    for (int i = 0; i < s.size(); i++) {
        char c = s[i];
        if (c != 'A' && c != 'E' && c != 'I' && c != 'O' && c != 'U') continue;
        if (prev != -1) ans = max(ans, i - prev);
        prev = i;
    }
    cout << ans << endl;
    return 0;
}
