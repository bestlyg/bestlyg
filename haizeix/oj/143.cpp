#include <cstdio>
#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <unordered_set>
using namespace std;
int check1(int num){
    return num % 6 == 0;
}
int check2(int num){
    int v = num / 100;
    for (int i = 2; i < v; i++) {
        if (v % i == 0) return 0;
    }
    return 1;
}
int check3(int num){
    int v = num % 100, n = sqrt(v);
    return n * n == v;
}
int main(){
    int a, b, cnt = 0;
    cin >> a >> b;
    for (int i = a; i <= b; i++) {
        if (check1(i) && check2(i) && check3(i)) {
            if (cnt) cout << ' ';
            cout << i;
            cnt++;
        }
    }
    cout << endl << cnt << endl;
    return 0;
}
