#include <iostream>

using namespace std;
int main(){
    int n;
    cin >> n;
    while (n) {
        for (int i = 0; i < 2 * n; i++) cout << 'A';
        cout << endl;
        n--;
    }
    return 0;
}
