#include <iostream>
#include <vector>
using namespace std;
int main(){
    int n, m, tmp;
    cin >> n >> m;
    vector<vector<int>> list(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> list[i][j];
        }
    }
    for (int j = 0; j < m; j++) {
        int sum = 0;
        for (int i = 0; i < n; i++) sum += list[i][j];
        cout << sum << endl;
    }
    return 0;
}
