#include <iostream>
using namespace std;

int main() {
    int n, f[1005] = {0, 1, 3};
    cin >> n;
    for (int i = 3; i <= n; i++) f[i] = (f[i - 1] + 2 * f[i - 2]) % 12345;
    cout << f[n] << endl;
    return 0;
}
