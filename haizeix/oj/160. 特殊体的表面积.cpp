#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
int main(){
    const double pi = 3.14;
    cout << fixed << setprecision(2);
    double r, h, sum = 0;
    cin >> r >> h;
    double d = r * 2;
    sum += (pi * r * r / 2 + d * d / 2) * 2;
    sum += (pi * d / 2 + d + sqrt(d * d + d * d)) * h;
    cout << sum << endl;
    return 0;
}
