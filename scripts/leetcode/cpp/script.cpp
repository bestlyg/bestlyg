#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
typedef pair<int, int> node;
vector<node> merge(vector<node> &list);
int main(){
    int l, n;
    cin >> l >> n;
    vector<node> list;
    for (int i = 0; i < n; i++) {
        int t1, t2;
        cin >> t1 >> t2;
        list.push_back(make_pair(t1, t2));
    }
    list = merge(list);
    int sum = l + 1;
    for (auto item : list) {
        // cout << "item  " << item.first << ", " << item.second << endl;
        sum -= item.second - item.first + 1;
    }
    cout << sum << endl;
    return 0;
}
vector<node> merge(vector<node> &list) {
    sort(list.begin(), list.end(), [&](node a, node b) -> bool{
        return a.first != b.first ? a.first < b.first : a.second < b.second;
    });
    vector<node> ans;
    for (int i = 0; i < list.size(); i++) {
        while (i < list.size() && ans.size() && ans.back().second >= list[i].first) {
            ans.back().second = max(list[i].second, ans.back().second);
            i++;
        }
        if (i < list.size()) ans.push_back(list[i]);
    }
    return ans;
}