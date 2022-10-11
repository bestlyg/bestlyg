#include <cstdio>
#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <unordered_set>
using namespace std;
int main(){
    cout << fixed << setprecision(2);
    int n;
    cin >> n;
    vector<int> list(n);
    for (int i = 0; i < n; i++) cin >> list[i];
    sort(list.rbegin(), list.rend());
    int k, sum = 0;
    cin >> k;
    for (int i = 0; i < k; i++) sum += list[i];
    cout << 1.0 * sum / k << endl;
    return 0;
}
