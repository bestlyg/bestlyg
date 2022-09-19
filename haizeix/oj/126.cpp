#include <iostream>
#include <iomanip>

using namespace std;

const double pi = 3.14;
int main(){
    double r1, r2;
    cin >> r1 >> r2;
    cout << fixed << setprecision(2)
         << (r1 * r1 - r2 * r2) * pi<< endl;
    return 0;
}
