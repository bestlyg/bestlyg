const welcomeKey = '1';
const langCN = 'chinese';
const langEN = 'english';
const i18n = {
  [langCN]: {
    [welcomeKey]: '欢迎',
  },
  [langEN]: { [welcomeKey]: 'welcome' },
};
const lang = langEN;
function welcome(templates, ...values) {
  let ans = '';
  let i = 0;
  for (; i < templates.length - 1; i++) {
    ans += templates[i] + i18n[lang][values[i]];
  }
  ans += templates[i];
  console.log(ans);
}
welcome`~~~~ ${welcomeKey} Bestlyg`;
