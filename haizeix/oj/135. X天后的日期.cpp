#include <cstdio>
#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <unordered_set>
using namespace std;
int months[13] = {
    0, 31, 28, 31, 30, 31, 30, 
    31, 31, 30, 31, 30, 31
};
void check_leap(int y) {
    if (y % 4 == 0 && y % 400 != 0 || y % 400 == 0) {
        months[2] = 29;
    } else {
        months[2] = 28;
    }
}
void print(int y, int m, int d) {
    cout << y << ' ' << m << ' ' << d << endl;
}
int main(){
    int x, y, m, d;
    cin >> x >> y >> m >> d;
    check_leap(y);
    int month_day = months[m];
    // cout << x << " " << month_day << endl;
    // print(y, m, d);
    if (d + x > month_day) {
        x -= month_day - d;
        d = 0; 
        m++;
        if (m > 12) {
            m -= 12;
            y++;
            check_leap(y);
        }
        month_day = months[m]; 
    }
    // cout << x << " " << month_day << endl;
    // print(y, m, d);
    while (month_day < x) {
        x -= month_day;
        m++;
        if (m > 12) {
            m -= 12;
            y++;
            check_leap(y);
        }
        month_day = months[m];
    }
    // cout << x << " " << month_day << " " << d << endl;
    // print(y, m, d);
    d += x;
    print(y, m, d);
    return 0;
}
