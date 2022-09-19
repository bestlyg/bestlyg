#include <algorithm>
#include <climits>
#include <cstring>
#include <functional>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

#define MAX 2005
struct node {
    int row, col, step, flag;
};
int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
char data[MAX][MAX];
/**
 00 没走过
 01 买手机前走过一次
 10 买手机后走过一次
 11 都走过
 */
int check[MAX][MAX];
queue<node> q;

int main() {
    memset(data, 0, sizeof(char) * MAX * MAX);
    memset(check, 0, sizeof(int) * MAX * MAX);
    int n, m, srow, scol;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> data[i][j];
            if (data[i][j] == 'S') {
                srow = i;
                scol = j;
                check[i][j] = 1;
                q.push((node){i, j, 0, 0});
            }
        }
    }
    while (q.size()) {
        node v = q.front();
        q.pop();
        // printf("===\nv: row = %d, col = %d, step = %d, flag = %d\n", v.row,
        //        v.col, v.step, v.flag);
        for (int i = 0; i < 4; i++) {
            int nrow = v.row + dirs[i][0], ncol = v.col + dirs[i][1];
            if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m ||
                data[nrow][ncol] == '#')
                continue;
            // printf("row = %d, col = %d, data = %c, check = %d\n", nrow, ncol,
            //        data[nrow][ncol], check[nrow][ncol]);
            if (v.flag == 1 && data[nrow][ncol] == 'T') {
                cout << v.step + 1 << endl;
                return 0;
            }
            if (v.flag == 0 && (check[nrow][ncol] & 0b01) == 0) {
                check[nrow][ncol] |= 0b01;
                node next = (node){nrow, ncol, v.step + 1, 0};
                if (data[nrow][ncol] == 'P') next.flag = 1;
                q.push(next);
            } else if (v.flag == 1 && (check[nrow][ncol] & 0b10) == 0) {
                check[nrow][ncol] |= 0b10;
                node next = (node){nrow, ncol, v.step + 1, 1};
                q.push(next);
            }
        }
    }
    cout << 'o' << endl;
    return 0;
}
