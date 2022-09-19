#include <algorithm>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int main() {
    map<string, int> dict;
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string str;
        int cnt;
        cin >> str >> cnt;
        dict.insert(make_pair(str, cnt));
    }
    cin >> n;
    for (int i = 0; i < n; i++) {
        string str;
        cin >> str;
        cout << dict[str] << endl;
    }
    return 0;
}
