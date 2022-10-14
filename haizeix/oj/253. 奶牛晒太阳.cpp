#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Cow { int nmin, nmax; };

int main() {
    int c, l;
    cin >> c >> l;
    vector<Cow> clist(c);
    for (int i = 0; i < c; i++) cin >> clist[i].nmin >> clist[i].nmax;
    sort(clist.begin(), clist.end(), [&](Cow a, Cow b){ return a.nmax != b.nmax ? a.nmax < b.nmax : a.nmin > b.nmin; });
    vector<int> slist(2505, 0);
    for (int i = 0; i < l; i++) {
        int v, c;
        cin >> v >> c;
        slist[v] += c;
    }
    int ans = 0;
    for (int i = 0; i < c; i++) {
        for (int j = clist[i].nmin; j <= clist[i].nmax; j++) {
            if (slist[j]) {
                ans++;
                slist[j]--;
                break;
            }
        }
    }
    cout << ans << endl;
    return 0;
}

