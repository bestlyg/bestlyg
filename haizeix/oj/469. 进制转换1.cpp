#include <iostream>
#include <cstdio>
#include <cmath>
#include <vector>
#include <algorithm>
using namespace std;
int main(){
    long long n;
    string x;
    int num = 0;
    cin >> n >> x;
    for (int bit = 0, i = x.size() - 1; i >= 0; bit++, i--) num += (x[i] - '0') * pow(n, bit);
    cout << num << endl;
    return 0;
}
