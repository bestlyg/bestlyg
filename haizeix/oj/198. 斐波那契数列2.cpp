#include <iostream>
using namespace std;
const int mod = 1e9 + 7;
int f(int num){
    if (num == 1 || num == 2) return 1;
    int first = 1, second = 1;
    while (num > 2) {
        int tmp = first;
        first = second;
        second = (second + tmp) % mod;
        num--;
    }
    return second;
}
int main(){
    int num;
    cin >> num;
    cout << f(num) << endl;
    return 0;
}
