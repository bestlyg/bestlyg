#include <iostream>
#include <iomanip>
using namespace std;
int main(){
    int n, m, tmp;
    cin >> n >> m;
    cout << fixed << setprecision(6);
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = 0; j < m; j++) {
            cin >> tmp;
            sum += tmp;
        }
        cout << 1.0 * sum / m << endl;
    }
    return 0;
}
