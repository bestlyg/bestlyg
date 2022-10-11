#include <iostream>
#include <string>
#include <vector>
using namespace std;
typedef pair<int, int> node;
void print(vector<node> &list) {
    for (int i = 0; i < list.size(); i++) {
         cout << "i = " << i << ", v1 = " << list[i].first 
              << ", v2 = " << list[i].second << endl;
    }
}
int main(){
    int n, m;
    cin >> n >> m;
    vector<node> list;
    vector<pair<string, int>> ops;
    for (int i = 0; (1 << i) <= m; i++) {
        list.emplace_back(make_pair(1, 0));
    }
    // print(list);
    string temps;
    int tempi;
    for (int i = 0; i < n; i++) {
        cin >> temps >> tempi;
        ops.emplace_back(make_pair(temps, tempi));
        for (int j = 0; (tempi >> j) && j < list.size(); j++) {
            int bitnum = (tempi >> j) & 1;
            if (temps == "AND") {
                list[j].first  &= bitnum;
                list[j].second &= bitnum;
            } else if (temps == "OR") {
                list[j].first  |= bitnum;
                list[j].second |= bitnum;
            } else {
                list[j].first  ^= bitnum;
                list[j].second ^= bitnum;
            }
        }
        // cout << "===\n" << endl;
        // cout << "s = " << temps << ", i = " << tempi << endl;
        // print(list);
    }
    // print(list);
    int ans = 0, i = 0;
    for (; i < list.size(); i++) {
        if (list[i].first == 1 && 
            list[i].second == 0 && 
            (i != list.size() - 1 || (ans | (1 << i)) <= m)) {
            ans |= (1 << i);
        }
    }
    // cout << ans << endl;
    for (auto &op : ops) {
        if (op.first == "AND") ans  &= op.second;
        else if (op.first == "OR") ans  |= op.second;
        else ans  ^= op.second;

    }
    cout << ans << endl;
    return 0;
}
