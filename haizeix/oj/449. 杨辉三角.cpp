#include <iostream>
#include <vector>
using namespace std;
int main(){
    int n;
    cin >> n;
    vector<int> v[2];
    v[0].push_back(1);
    cout << "1" << endl;
    for (int i = 1; i < n; i++) {
        int idx = i % 2, prev = (idx + 1) % 2;
        v[prev].clear();
        v[idx].push_back(1);
        for (int j = 1; j < i; j++) v[idx].push_back(v[prev][j - 1] + v[prev][j]);
        v[idx].push_back(1);
        for (int i = 0; i < v[idx].size(); i++) {
            if (i) cout << ' ';
            cout << v[idx][i];
        }
        cout << endl;
    }
    return 0;
}
