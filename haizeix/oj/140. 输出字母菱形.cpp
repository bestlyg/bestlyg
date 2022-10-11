#include <iostream>
using namespace std;
int main(){
    int n;
    cin >> n;
    char c = 'A';
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n - i; j++) cout << ' ';
        for (int j = 0; j < 2 * i - 1; j++) cout << c;
        cout << endl;
        c++;
    }
    c--;
    for (int i = n - 1; i >= 1; i--) {
        c--;
        for (int j = 0; j < n - i; j++) cout << ' ';
        for (int j = 0; j < 2 * i - 1; j++) cout << c;
        cout << endl;
    }
    return 0;
}
