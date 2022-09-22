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
    for (int i = 0; i < n; i++) cin >> list[i];
    for (auto &item : list) reverse(item.begin(), item.end());
    sort(list.begin(), list.end());
    for (int i = 0; i < n; i++) cout << list[i] << endl;
    return 0;
}
