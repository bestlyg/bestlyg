/*
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';
import { ListNode } from './structures';
*/
int dirs[4][2] = {
  {0, 1}, {0, -1},
  {1, 0}, {-1, 0}
};

class Solution {
public:
  typedef pair<int, int> node;
  int rowLen, colLen;
  int cutOffTree(vector<vector<int>>& forest) {
      rowLen = forest.size(), colLen = forest[0].size();
      vector<int> list;
      for (int row = 0; row < rowLen; row++) {
          for (int col = 0; col < colLen; col++) {
              if (forest[row][col] > 1) list.emplace_back(forest[row][col]);
          }
      }
      sort(list.begin(), list.end(), [&](int a, int b)->bool{ return a < b; });
      int ans = 0;
      node prev = make_pair(0, 0);
      for (int i = 0; i < list.size(); i++) {
          int step = findNext(forest, prev, list[i]);
          if (step == -1) return -1;
          ans += step;
      }
      return ans;
  }
  int findNext(vector<vector<int>>& forest, node &start, int target){
      int step = 0, size = 1;
      queue<node> q;
      vector<vector<bool>> used(rowLen, vector(colLen, false));
      used[start.first][start.second] = true;
      q.push(start);
      while (q.size()) {
          node item = q.front(); q.pop();
          if (forest[item.first][item.second] == target) {
              start.first = item.first;
              start.second = item.second;
              return step;
          }
          for (int i = 0; i < 4; i++) {
              int nrow = item.first + dirs[i][0], ncol = item.second + dirs[i][1];
              if (nrow < 0 || nrow == rowLen || ncol < 0 || ncol == colLen || forest[nrow][ncol] == 0 || used[nrow][ncol]) continue;
              q.push(make_pair(nrow, ncol));
              used[nrow][ncol] = true;
          }
          if (--size == 0) {
              size = q.size(); 
              step++;
          }
      }
      return -1;
  }
};







