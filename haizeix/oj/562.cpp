#include <iostream>
using namespace std;
int main(){
    int n, num = 0, tmp; 
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> tmp;
        num ^= tmp;
    }
    cout << num << endl;
    return 0;
}
