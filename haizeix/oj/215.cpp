#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
struct Stu{
    string name;
    int sum;
};
int main(){
    int n;
    cin >> n;
    vector<Stu> list(n);
    for (int i = 0; i < n; i++) {
        cin >> list[i].name;
        list[i].sum = 0;
        int tmp;
        for (int j = 0; j < 4; j++) {
            cin >> tmp;
            list[i].sum += tmp;
        }
    }
    sort(list.begin(), list.end(), [&](Stu a, Stu b) -> bool{ 
        return b.sum < a.sum;
    });
    for (int i = 0; i < 3; i++) {
        cout << list[i].name << endl;
    }
    return 0;
}
