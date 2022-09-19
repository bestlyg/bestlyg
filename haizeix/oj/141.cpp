#include <iostream>
using namespace std;
int main(){
    int n;
    cin >> n;
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j < i; j++) cout << ' ';
        char c = 'A' + i;
        for (int j = i; j < n; j++) cout << c++;
        cout << c;
        for (int j = i; j < n; j++) cout << --c;
        cout << endl;
    }
    for (int i = n - 1; i >= 0; i--) {
        for (int j = 0; j < i; j++) cout << ' ';
        char c = 'A' + i;
        for (int j = i; j < n; j++) cout << c++;
        cout << c;
        for (int j = i; j < n; j++) cout << --c;
        cout << endl;
    }
    return 0;
}
