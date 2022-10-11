#include <algorithm>
#include <iostream>
#include <cmath>

using namespace std;

string dfs(char start, char end, int k) {
    if (k == 1) return string(1, start);
    int cnt = pow(2, end - start);
    // cout << "c = " << start << ", end = " << end << ", cnt = " << cnt << ", k = " << k << endl;
    if (k > cnt) return dfs(start + 1, end, k - cnt);
    return string(1, start) + dfs(start + 1, end, k - 1);
}

int main() {
    int n, k;
    cin >> n >> k;
    cout << dfs('A', 'A' + n - 1, k) << endl;
    return 0;
}
