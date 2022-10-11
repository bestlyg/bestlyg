#include <iostream>
#include <algorithm>
#include <unordered_set>
#include <vector>

using namespace std;

int dirs[4][2] = {
  {0, 1}, // 东 0
  {1, 0}, // 南 1
  {0, -1},// 西 2
  {-1, 0} // 北 3
};

bool dfs(int n, 
         int x1, int y1, int d1, 
         int x2, int y2, int d2, 
         vector<vector<int>> &used1, vector<vector<int>> &used2,
         int &resx, int &resy) {
    // cout << "===dfs===" << endl 
    //      << "x1 = " << x1 << ", y1 = " << y1 << ", d1 = " << d1
    //      << ", x2 = " << x2 << ", y2 = " << y2 << ", d2 = " << d2
    //      << endl;
    if (x1 >= n) return true;
    if (x1 == x2 && y1 == y2) {
        resx = x1;
        resy = y1;
        return true;
    }
    int nx1 = x1, ny1 = y1, nx2 = x2, ny2 = y2;
    for (int i = 0; i < 4; i++, d1 = (d1 + 1) % 4) {
        int _nx1 = dirs[d1][0] + x1, _ny1 = dirs[d1][1] + y1;
        if (_nx1 < 0 || _nx1 == n || _ny1 < 0 || _ny1 == n || used1[_nx1][_ny1]) continue;
        used1[_nx1][_ny1] = 1;
        nx1 = _nx1;
        ny1 = _ny1;
        break;
    }
    for (int i = 0; i < 4; i++, d2 = (d2 + n - 1) % 4) {
        int _nx2 = dirs[d2][0] + x2, _ny2 = dirs[d2][1] + y2;
        if (_nx2 < 0 || _nx2 == n || _ny2 < 0 || _ny2 == n || used2[_nx2][_ny2]) continue;
        used2[_nx2][_ny2] = 1;
        nx2 = _nx2;
        ny2 = _ny2;
        break;
    }
    // cout << "nx1 = " << nx1 << ", ny1 = " << ny1 
    //      << ", nx2 = " << nx2 << ", ny2 = " << ny2 
    //      << endl;
    if (x1 == nx1 && y1 == ny1 && x2 == nx2 && y2 == ny2) return false;
    return dfs(n, nx1, ny1, d1, nx2, ny2, d2, used1, used2, resx, resy);
}

void comp(int n, int x1, int y1, int d1, int x2, int y2, int d2) {
    // cout << "======COMP======" << endl;
    vector<vector<int>> used1(n, vector<int>(n, 0)), used2(n, vector<int>(n, 0));
    used1[x1][y1] = 1;
    used2[x2][y2] = 1;
    int resx = -1, resy = -1;
    dfs(n, x1, y1, d1, x2, y2, d2, used1, used2, resx, resy);
    if (resx == -1) cout << -1 << endl;
    else cout << resx << ' ' << resy << endl;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, x1, y1, d1, x2, y2, d2;
        cin >> n >> x1 >> y1 >> d1 >> x2 >> y2 >> d2;
        comp(n, x1, y1, d1, x2, y2, d2);
    }
    return 0;
}
