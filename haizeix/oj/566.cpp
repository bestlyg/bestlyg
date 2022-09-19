#include <algorithm>
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

int main() {
    map<string, int> map_name;
    int n, m, idx = 0;
    cin >> n >> m;
    vector<vector<string>> vec_web(n, vector<string>());
    string name, web;
    for (int i = 0; i < m; i++) {
        cin >> name >> web;
        int useridx;
        if (map_name.count(name))
            useridx = map_name[name];
        else {
            useridx = map_name[name] = idx++;
            vec_web[useridx].push_back(name);
        }
        vec_web[useridx].push_back(web);
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < vec_web[i].size(); j++) {
            if (j != 0) cout << " ";
            cout << vec_web[i][j];
        }
        cout << endl;
    }
    return 0;
}
