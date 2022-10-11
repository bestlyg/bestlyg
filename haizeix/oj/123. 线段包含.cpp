#include <iostream>

using namespace std;
int main(){
    int a, b, c, d;
    cin >> a >> b >> c >> d;
    cout << (a <= c && b >= d || c <= a && d >= b ? "YES" : "NO") << endl; 
    return 0;
}
