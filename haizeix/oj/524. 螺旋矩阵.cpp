#include <algorithm>
#include <iostream>

using namespace std;

int get_cnt(int size) {
    if (size == 1) return 1;
    return (size - 1) * 4;
}

int get_level(int n, int i, int j) {
    double half = (n + 1) / 2;
    if (n % 2 == 0) half += 0.5;
    return n / 2 - max(abs(i + 1 - half), abs(j + 1 - half));
}

int main() {
    int n, i, j;
    cin >> n >> i >> j;
    i--; j--;
    int level = get_level(n, i, j), num = 1,
        xymin = 0, xymax = n - 1;
    // cout << "n = " << n << ", i = " << i << ", j = " << j << ", level = " << level << endl;
    // for (int x = 0; x < n; x++) {
    //     for (int y = 0; y < n; y++) {
    //         if (x == i && y == j) cout << "|"; else cout << " ";
    //         cout << get_level(n, x, y);
    //         if (x == i && y == j) cout << "|"; else cout << " ";
    //         cout << " ";
    //     }
    //     cout << endl;
    // }
    int size = n;
    while (level--) num += get_cnt(size), xymin++, xymax--, size -= 2;
    // cout << "num = " << num << ", xymin = " << xymin << ", xymax = " << xymax << endl;
    int x = xymin, y = xymin;
    while (!(x == i && y == j)) {
        while (!(x == i && y == j) && y < xymax) y++, num++;
        // cout << "x = " << x << ", y = " << y << endl;
        while (!(x == i && y == j) && x < xymax) x++, num++;
        // cout << "x = " << x << ", y = " << y << endl;
        while (!(x == i && y == j) && y > xymin) y--, num++;
        // cout << "x = " << x << ", y = " << y << endl;
        while (!(x == i && y == j) && x > xymin)  x--, num++;
        // cout << "x = " << x << ", y = " << y << endl;
        // break;
    }
    cout << num << endl;
    return 0;
}

