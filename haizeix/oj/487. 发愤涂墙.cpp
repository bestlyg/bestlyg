#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

/**
 * 0 红白
 * 1 红蓝
 * 2 蓝白
 * 3 蓝红
 * 4 白红
 * 5 白蓝
 */ 
int main() {
    int n, len;
    cin >> n;
    len = ceil(1.0 * n / 2);
    if (n == 1 || n == 2) {
        cout << 2 << endl;
        return 0;
    }
    vector<vector<int>> dp(len, vector<int>(6, 0));
    if (n % 2 != 0) {
        dp[0][0] = dp[0][3] = 1;
    } else {
        dp[0][0] = dp[0][1] = dp[0][4] = dp[0][5] = 1;
    }
    for (int i = 1; i < len; i++) {
        dp[i][0] = dp[i][1] = dp[i - 1][0] + dp[i - 1][2] + dp[i - 1][5];
        dp[i][2] = dp[i - 1][3] + dp[i - 1][4];
        dp[i][3] = dp[i - 1][0] + dp[i - 1][2];
        dp[i][4] = dp[i][5] = dp[i - 1][1] + dp[i - 1][3] + dp[i - 1][4];
    }
    // for (int i = 0; i < len; i++) {
    //     cout  << "=====[" << i << "]=====" << endl;
    //     for (int j = 0; j < 6; j++) {
    //         cout << j << ": " << dp[i][j] << endl;
    //     }
    // }
    cout << dp[len - 1][0] + dp[len - 1][2] + dp[len - 1][3] + dp[len - 1][4] << endl;
    return 0;
}
