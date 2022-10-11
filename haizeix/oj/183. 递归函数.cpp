#include <iostream>
using namespace std;
int f(int num){
    return num <= 0     ? 0 
         : num == 1     ? 1
         : num % 2 == 0 ? 3 * f(num / 2) - 1
         : 3 * f((num + 1) / 2) - 1;
}
int main(){
    int num;
    cin >> num;
    cout << f(num) << endl;
    return 0;
}
