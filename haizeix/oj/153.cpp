#include <cstdio>
#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <unordered_set>
using namespace std;
int main(){
    int y, m, d;
    cin >> y >> m >> d;
    if (m < 3) {
        m += 12;
        y--;
    }
    int q = d, j = y / 100, k = y % 100;
    int h = (q + 26 * (m + 1) / 10 + k + k / 4 + j / 4 + 5 * j) % 7;
    h = h < 2 ? h + 7 : h;
    h -= 1;
    cout << h << endl;
    return 0;
}
