#include <iostream>

using namespace std;
int main(){
    int n;
    cin >> n;
    char c = 'A';
    while (n) {
        for (int i = 0; i < n; i++) cout << c++;
        cout << endl;
        n--;
    }
    return 0;
}
