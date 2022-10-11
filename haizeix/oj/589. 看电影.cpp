#include <algorithm>
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b > a) return gcd(b, a);
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    int n, k;
    cin >> n >> k;
    int v = gcd(n, k);
    cout << k / v << "/" << n / v << endl;
    return 0;
}

