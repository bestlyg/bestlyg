#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>

using namespace std;

struct node { double d, p; };

double d1, c, d2, p1, ans, dis;
int n;
node oil[10];

bool dfs(int onum, double lnum) {
    int idx = 9;
    // cout << "=====\nonum+1.d = " << oil[onum + 1].d << ", onum.d = " << oil[onum].d << ", dis = " << dis << endl
    //      << "onum = " << onum << ", lnum = " << lnum << ", n = " << n << ", ans = " << ans << endl;
    for (int i = onum + 1; i <= n + 1 && oil[i].d - oil[onum].d <= dis; i++) {
        if (oil[i].p < oil[idx].p) idx = i;
    }
    // cout << "idx = " << idx << endl;
    if (idx == 9) return false;
    if (oil[idx].p > oil[onum].p) {
        // cout << "1" << endl;
        if (oil[onum].d + dis >= d1) {
            // cout << "11" << endl;
            ans += ((d1 - oil[onum].d) / d2 - lnum) * oil[onum].p;
            return true;
        } else {
            // cout << "12" << endl;
            ans += (c - lnum) * oil[onum].p;
            return dfs(idx, c - (oil[idx].d - oil[onum].d) / d2);
        }
    } else {
        // cout << "2" << endl;
        ans += (((oil[idx].d - oil[onum].d) / d2) - lnum) * oil[onum].p;
        return dfs(idx, 0);
    }
}

int main() {
    cin >> d1 >> c >> d2 >> p1 >> n;
    dis = c * d2;
    oil[0].d = 0;
    oil[0].p = p1;
    oil[n + 1].d = d1;
    oil[9].p = 0x7FFFFFFF;
    oil[n + 1].p = oil[9].p - 1;
    for (int i = 1; i <= n; i++) cin >> oil[i].d >> oil[i].p;
    sort(oil + 1, oil + n + 1, [&](node o1, node o2){ return o1.d < o2.d; });
    // for (int i = 0; i <= n + 1; i++) {
    //     cout << "i = " << i << ", d = " << oil[i].d << ", p = " << oil[i].p << endl;
    // }
    if (dfs(0, 0)) printf("%.2f\n", ans);
    else cout << "No Solution" << endl;
    return 0;
}


