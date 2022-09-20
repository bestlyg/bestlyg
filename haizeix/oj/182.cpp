#include <iostream>
#include <cmath>
using namespace std;
int main(){
    int n;
    cin >> n;
    int ans = -1;
    for (int i = 0; i < n; i++) {
        int tmp;
        cin >> tmp;
        ans = max(ans, tmp);
    }
    cout << ans << endl;
    return 0;
}
