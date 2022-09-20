#include <iostream>
using namespace std;
long long pow(int n) {
    long long ans = 1, tmp = 2;
    while (n) {
        if (n & 1) ans *= tmp; 
        n >>= 1;
        tmp *= tmp;
    }
    return ans;
}
int main(){
    int n;
    cin >> n;
    cout << pow(n) << endl;
    return 0;
}
