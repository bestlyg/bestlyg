// void GetNext(const char *pattern, int *next) {
//     next[0] = -1;
//     for (int i = 1, j = -1; pattern[i]; ++i) {
//         while (j != -1 && pattern[j + 1] - pattern[i]) j = next[j];
//         if (pattern[j + 1] == pattern[i]) j += 1;
//         next[i] = j;
//     }
//     return ;
// }
function getNext(pattern) {
  const ans = [];
  for (let i = 1, j = -1; pattern[i]; i++) {
    while (j !== -1 && pattern[j + 1] !== pattern[i]) j = ans[j];
    if (pattern[j + 1] === pattern[i]) j++;
    ans[i] = j;
  }
  return ans;
}
