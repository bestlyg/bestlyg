#include <algorithm>
#include <iostream>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <vector>

using namespace std;

char str[30] = {0}, list[20] = {0};
int l, c, check[30] = {0}, cnt[2] = {0}, maxv = 0;

int isY(char ch) {
    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u';
}

void dfs(int idx, int start) {
    if (maxv == 25000) return;
    if (idx == l) {
        if (cnt[1] >= 1 && cnt[0] >= 2) {
            cout << list << endl;
            maxv++;
        }
        return;
    }
    for (int i = start; i < c; i++) {
        if (check[i]) continue;
        check[i] = 1;
        list[idx] = str[i];
        cnt[isY(str[i])]++;
        dfs(idx + 1, i + 1);
        cnt[isY(str[i])]--;
        check[i] = 0;
    }
}

int main() {
    cin >> l >> c;
    for (int i = 0; i < c; i++) cin >> str[i];
    sort(str, str + c);
    dfs(0, 0);
    return 0;
}
