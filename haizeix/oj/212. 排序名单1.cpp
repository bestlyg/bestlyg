#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main(){
    vector<string> list(10);
    for (int i = 0; i < 10; i++) cin >> list[i];
    sort(list.begin(), list.end());
    for (auto &item : list) cout << item << endl;
    return 0;
}
