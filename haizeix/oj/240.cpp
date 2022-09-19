#include <algorithm>
#include <functional>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

vector<vector<string>> data;

vector<string> comp(int n) {
    if (data.size() >= n) return data[n - 1];
    vector<string> prev = comp(n - 1);
    // cout << "prev.size() = " << prev.size() << endl;
    vector<string> ans;
    int cnt = prev[0].size();
    for (int i = 0; i < prev.size(); i++) {
        string line = "";
        line += prev[i];
        for (int j = 0; j < cnt; j++) line += " ";
        line += prev[i];
        ans.push_back(line);
    }
    for (int i = 0; i < prev.size(); i++) {
        string line = "";
        for (int j = 0; j < cnt; j++) line += " ";
        line += prev[i];
        for (int j = 0; j < cnt; j++) line += " ";
        ans.push_back(line);
    }
    for (int i = 0; i < prev.size(); i++) {
        string line = "";
        line += prev[i];
        for (int j = 0; j < cnt; j++) line += " ";
        line += prev[i];
        ans.push_back(line);
    }
    data.push_back(ans);
    // cout << "n = " << n << ", data.size() = " << data.size() << endl;
    return ans;
}

int main() {
    data.push_back((vector<string>){"X"});
    int n;
    while (cin >> n) {
        if (n == -1) break;
        // cout << "comp n = " << n << endl;
        vector<string> arr = comp(n);
        for (int i = 0; i < arr.size(); i++) {
            cout << arr[i] << endl;
        }
        cout << '-' << endl;
    }
    return 0;
}
