#include <cstdio>
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;
int main(){
    int n;
    cin >> n;
    unordered_set<int> sset;
    for (int i = 0; i < n; i++) {
        int tmp;
        cin >> tmp;
        sset.insert(tmp);
    }
    int k, s;
    cin >> k >> s;
    cout << (sset.count(s - k) ? "Yes" : "No") << endl;
    return 0;
}
