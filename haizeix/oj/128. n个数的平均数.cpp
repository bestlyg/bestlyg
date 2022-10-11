#include <iostream>
#include <iomanip>
using namespace std;
int main(){
    int n, sum = 0, temp;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> temp;
        sum += temp;
    }
    cout << fixed << setprecision(2) << 1.0 * sum / n << endl;
    return 0;
}
