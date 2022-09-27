#include <iostream>
using namespace std;
union Data{
    char c[4];
    int i;
};
int main(){
    int n;
    cin >> n;
    Data d;
    d.i = n;
    swap(d.c[0], d.c[2]);
    swap(d.c[1], d.c[3]);
    cout << d.i << endl;
    return 0;
}
