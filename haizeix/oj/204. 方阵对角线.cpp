#include <iostream>
#include <vector>
using namespace std;
int main(){
    int n;
    cin >> n;
    vector<int> ans;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            int tmp;
            cin >> tmp;
            if (i == j) ans.push_back(tmp);
        }
    }
    for (auto &num : ans) cout << num << endl;
    return 0;
}
