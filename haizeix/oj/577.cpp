#include <algorithm>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

int main() {
    unordered_map<string, int> dict;
    string ans = "";
    char str[20] = {0};
    while (scanf("%s", str) != EOF) {
        for (int i = 0; str[i]; i++) str[i] |= 0b100000;
        // cout << str << endl;
        ++dict[str];
        if (dict[str] > dict[ans] || dict[str] == dict[ans] && str < ans)
            ans = str;
    }
    cout << ans << ' ' << dict[ans] << endl;
    return 0;
}
