#include <iostream>
using namespace std;
int main(){
    string str;
    cin >> str;
    for (int i = 0; i < str.size(); i++){
        char c = str[i];
        if (c >= 'A' && c < 'Z' || c >= 'a' && c < 'z') str[i]++;
        else if (c == 'Z') str[i] = 'A';
        else if (c == 'z') str[i] = 'a';
    }
    cout << str << endl;
    return 0;
}
