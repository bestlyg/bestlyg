#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;
struct Node { 
    int l, r;
};
int main() {
    int n, m;
    cin >> n >> m;
    vector<Node> list(m + 1);
    for (int i = 0; i < m; i++) cin >> list[i].l >> list[i].r;
    list[m].l = list[m].r = 0x7fffffff;
    sort(list.begin(), list.end(), [](Node a, Node b){ return a.l < b.l; });
    long long ans = 0;
    int curIdx = 0, rightIdx = 0, right = 0;
    for (int i = 1; i <= n; i++) {
        while (curIdx <= m && list[curIdx].l < i) curIdx++;
        if (i == 1 || rightIdx < curIdx) {
            rightIdx = curIdx;
            right = list[curIdx].r;
            for (int j = curIdx + 1; j <= m; j++) {
                if (list[j].r < right) {
                    right = list[j].r;
                    rightIdx = j;
                }
            }
        }
        ans += min(right, n + 1) - i;
    }
    cout << ans << endl;
    return 0;
}
