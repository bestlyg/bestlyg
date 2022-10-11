#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <algorithm>
using namespace std;
int dirs[4][4] = {
    {15, 14, 13, 12},
    {11, 10, 9 , 8 },     
    {7 , 6 , 5 , 4 },
    {3 , 2 , 1 , 0 },
};
void print(short num) {
    cout << "=== print " << num << "===";
    vector<short> list;
    for (int i = 0; i < 16; i++) {
        list.push_back(num & 1);
        num >>= 1;
    }
    reverse(list.begin(), list.end());
    for (int i = 0; i < 16; i++) {
        if (i % 4 == 0) cout << endl;
        cout << list[i];
    }
    cout << endl;
}
short revert(short current, int row, int col) {
    short ans = current, start;
    // row
    if (row == 0) start = 15;
    else if (row == 1) start = 11;
    else if (row == 2) start = 7;
    else start = 3;
    for (int i = 0; i < 4; i++) ans ^= 1 << start--;
    // col
    if (col == 0) start = 15;
    else if (col == 1) start = 14;
    else if (col == 2) start = 13;
    else start = 12;
    for (int i = 0; i < 4; i++) ans ^= 1 << start, start -=4;
    // center
    ans ^= 1 << dirs[row][col];
    return ans;
}
int main(){
    short root = 0;
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            char tmp;
            cin >> tmp;
            root = (root << 1) | (tmp == '+' ? 1 : 0);
        }
    }
    queue<short> q;
    q.push(root);
    unordered_set<short> s;
    s.insert(root);
    int size = 1, level = 0;
    while (q.size() && q.front() != 0) {
        short current = q.front();
        q.pop();
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                short next = revert(current, i, j);
                if (s.count(next)) continue;
                q.push(next);
                s.insert(next);
            }
        }
        if (--size == 0) {
            size = q.size();
            level++;
        }
    }
    cout << level << endl;
    return 0;
}

/**
  15 14 13 12 
  11 10 9  8        
  7  6  5  4
  3  2  1  0
 */
 
