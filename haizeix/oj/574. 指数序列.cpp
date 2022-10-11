#include <iostream>
#include <set>
#include <algorithm>
using namespace std;
void add(set<int> &s, int num, int &nmax) {
    if (s.count(num)) {
        s.erase(num);
        add(s, num + 1, nmax);
    } else {
        nmax = max(nmax, num);
        s.insert(num);
    }
}
int main(){
    int n, nmax = -1;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int tmp;
        cin >> tmp;
        add(s, tmp, nmax);
    }
    // for (auto &num : s) cout << num << ',';
    // cout << endl;
    // cout << nmax << ", " << s.size() << endl;
    cout << nmax + 1 - (int)s.size() << endl;
    return 0;
}
