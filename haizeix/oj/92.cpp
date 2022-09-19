#include <iostream>
#include <iomanip>

using namespace std;

int main(){
    const double pi = 3.14;
    double r;
    cin >> r;
    cout << fixed << setprecision(2)
         << 2 * pi * r << endl 
         << pi * r * r << endl;
    return 0;
}
