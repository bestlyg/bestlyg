#include <algorithm>
#include <iostream>

using namespace std;

struct game {
    int time, money;
};
bool comp(const game &a, const game &b) { return a.time < b.time; }

int main() {
    int n, money;
    cin >> money >> n;
    game g[n];
    int mark[600] = {0};
    for (int i = 0; i < n; i++) cin >> g[i].time;
    for (int i = 0; i < n; i++) {
        cin >> g[i].money;
        money -= g[i].money;
    }
    sort(g, g + n, comp);
    // for (int i = 0; i < n; i++)
    //     printf("game %d : time = %d, money = %d\n", i, g[i].time,
    //     g[i].money);
    int time = 0;
    for (int i = 0; i < n; i++) {
        // cout << "=====" << endl;
        // for (int i = 0; i < 10; i++) {
        //     cout << "mark [" << i << "] = " << mark[i] << endl;
        // }
        if (!mark[g[i].time]) {
            mark[g[i].time] = i + 1;
            continue;
        }
        int j = g[i].time;
        while (j > 0 && mark[j]) j--;
        if (j > 0) {
            mark[j] = i + 1;
            continue;
        }
        int maxidx = 1;
        for (j = 1; j <= g[i].time; j++) {
            if (g[mark[j] - 1].money < g[mark[maxidx] - 1].money) maxidx = j;
        }
        if (g[mark[maxidx] - 1].money >= g[i].money) continue;
        mark[maxidx] = i + 1;
    }
    for (int i = 0; i < 600; i++) {
        if (mark[i]) {
            // cout << "find mark i = " << i << ", mark[i] = " << mark[i] - 1
            //      << endl;
            money += g[mark[i] - 1].money;
        }
    }
    cout << money << endl;
    return 0;
}
