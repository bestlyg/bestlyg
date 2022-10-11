#include <iostream>
#include <vector>
using namespace std;
int main(){
    int n, mid;
    cin >> n;
    mid = (n + 1) / 2;
    vector<vector<int>> list(n, vector<int>(n, -1));
    for (int i = 0; i < mid; i++) {
        for (int j = i; j < n - i; j++) {
            list[i][j]         = 
            list[n - i - 1][j] = 
            list[j][i]         = 
            list[j][n - i - 1] = i + 1;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j) cout << ' ';
            cout << list[i][j];
        }
        cout << endl;
    }
    return 0;
}
