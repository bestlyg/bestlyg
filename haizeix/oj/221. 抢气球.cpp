#include <iostream>
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;
int main(){
    int n, m;
    cin >> n >> m;
    vector<int> nlist(n), mlist(m), idxlist(n, 0);
    for (int i = 0; i < n; i++) {
        idxlist[i] = i;
        cin >> nlist[i];
    }
    for (int i = 0; i < m; i++) cin >> mlist[i];
    sort(idxlist.begin(), idxlist.end(), [&](int i1, int i2){
        return nlist[i1] < nlist[i2];
    });
    sort(mlist.begin(), mlist.end());
    for (int i = 0, mi = 0; i < n; i++) {
        int v = nlist[idxlist[i]];
        int j = mi;
        while (j < m && mlist[j] <= v) j++;
        nlist[idxlist[i]] = j - mi;
        mi = j;
    }
    for (auto &item : nlist) printf("%d\n", item);
    return 0;
}
