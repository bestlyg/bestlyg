#include <iostream>
#include <cstdio>
#include <cmath>
#include <vector>
#include <algorithm>
#include <limits>
#include <string>
using namespace std;
typedef vector<short> List;
class BigNum {
    List list;
public:
    BigNum(int num){
        while (num) {
            list.push_back(num % 10);
            num /= 10;
        }
    }
    BigNum(string num, int radix){
        for (int i = num.size() - 1; i >= 0; i--) {
            
        }
    }
    List& get(){
        return list;
    }
    BigNum& operator+=(BigNum &item) {
        List &list2 = item.get();
        int add = 0, i = 0, n = max(list.size(), list2.size());
        for (; i <= n; i++) {
            int num1 = i < list.size() ? list[i] : 0,
                num2 = i < list2.size() ? list2[i] : 0,
                num = num1 + num2 + add;
            if (num >= 10) num -= 10, add = 1;
            else add = 0;
            if (i >= list.size()) list.push_back(num);
            else list[i] = num;
        }
        return *this;
    }
    void print(){
        for (int i = list.size() - 1; i >= 0; i--) cout << list[i];
        cout << endl;
    }
};
int main(){
    int num1, num2;
    string s1, s2;
    cin >> num1 >> num2 >> s1;
    int n1 = 991239, n2 = 512234;
    BigNum a(n1), b(n2); 
    a += b;
    a.print();
    cout << n1 + n2 << endl;
    return 0;
}