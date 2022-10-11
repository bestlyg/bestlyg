#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
struct Stu{
    string name;
    int sum;
};
int main(){
    int n;
    cin >> n;
    vector<Stu> list(n);
    int nmin = INT_MAX, nmax = INT_MIN;
    for (int i = 0; i < n; i++) {
        cin >> list[i].name;
        list[i].sum = 0;
        int tmp;
        for (int j = 0; j < 4; j++) {
            cin >> tmp;
            nmin = min(nmin, tmp);
            nmax = max(nmax, tmp);
            list[i].sum += tmp;
        }
        cout << list[i].sum << endl;
    }
    sort(list.begin(), list.end(), [&](Stu a, Stu b) -> bool{ 
        return b.sum < a.sum;
    });
    cout << list[0].name << endl
         << nmax << " " << nmin << endl;
    return 0;
}
