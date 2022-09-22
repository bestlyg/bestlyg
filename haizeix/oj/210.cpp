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
    sort(list.begin(), list.end());
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << list[i];
    }
    return 0;
}
