#include <iostream>
#include <iomanip>

using namespace std;

int main(){
    double w, h;
    cin >> w >> h;
    cout << fixed << setprecision(2)
         << w / h / h << endl;
    return 0;
}
