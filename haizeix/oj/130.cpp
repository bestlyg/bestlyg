#include <iostream>
#include <iomanip>

using namespace std;
int main(){
    const double v = 1.00417;
    double sum = 0;
    int m, n;
    cin >> m >> n;
    while (n--) sum = (m + sum) * v;
    cout << fixed << setprecision(2) 
         << "$" << sum << endl;
    return 0;
}
