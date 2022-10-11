#include <algorithm>
#include <cstring>
#include <iostream>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <vector>

using namespace std;

int n;
int list[30][30], check[30];

void dfs(int start) {
    if (start != 1) cout << '-';
    cout << start;
    for (int i = 1; i <= n; i++) {
        if (check[i] || list[start][i] == 0) continue;
        check[i] = 1;
        dfs(i);
    }
}
int main() {
    cin >> n;
    memset(list, 0, sizeof(int) * 30 * 30);
    memset(check, 0, sizeof(int) * 30);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> list[i][j];
        }
    }
    for (int i = 1; i <= n; i++) {
        if (check[i]) continue;
        check[i] = 1;
        dfs(i);
    }
    return 0;
}
