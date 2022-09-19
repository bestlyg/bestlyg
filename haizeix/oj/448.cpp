#include <iostream>
#include <unordered_map>
using namespace std;
int main(){
    unordered_map<int, int> m;
    int n, temp;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> temp;
        m[temp] = i + 1;
    }
    cin >> temp;
    cout << m[temp] << endl;
    return 0;
}
