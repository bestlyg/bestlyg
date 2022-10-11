#include <cstdio>
#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_set>
using namespace std;
int main(){
    int n;
    cin >> n;
    vector<string> list(n);
    string tmp;
    for (int i = 0; i < n; i++) {
        cin >> tmp;
        list[i] = tmp.substr(3);
    }
    sort(list.begin(), list.end());
    for (auto &item : list) cout << item << endl;
    return 0;
}
