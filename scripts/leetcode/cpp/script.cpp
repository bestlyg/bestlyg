#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main(){
    int n;
    cin >> n;
    vector<int> list(n), idx_list(n);
    for (int i = 0; i < n; i++) {
        cin >> list[i];
        idx_list[i] = i;
    }
    sort(idx_list.begin(), idx_list.end(), [&](const int i1, const int i2){
        return list[i1] < list[i2];
    });
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << idx_list[i] + 1;
    }
    cout << endl;
    return 0;
}