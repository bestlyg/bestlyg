const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// config start
const ownpath = './haizeix/oj';
const id = 9531;
const headers = {
  cookie:
    'PHPSESSID=a3h2phe7063g8llvkmh5t96j37; sso_access_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJvd25lciI6ImhhaS16aGUtaSIsIm5hbWUiOiJiZXN0bHlnIiwiY3JlYXRlZFRpbWUiOiIyMDIxLTEwLTI3IDIyOjMxOjI1IiwidXBkYXRlZFRpbWUiOiIyMDIyLTA0LTMwIDEwOjA0OjMyIiwiaWQiOiI3NWY3Yjc3Yy0yODNjLTQ0YTctODc1MC0xMWI2YTdjMWQ3Y2QiLCJ0eXBlIjoibm9ybWFsLXVzZXIiLCJwYXNzd29yZCI6IiIsInBhc3N3b3JkU2FsdCI6Imxuc3RoMHFrb3Rzb2d3b3N3Z2tjd3N3c3M0a3Nvd28iLCJkaXNwbGF5TmFtZSI6ImJlc3RseWciLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImF2YXRhciI6Imh0dHBzOi8vc2NlM2E5YjZjNWQwZzMtc2ItcW4ucWlxaXV5dW4ubmV0L2ZpbGVzL2RlZmF1bHQvMjAyMS8xMC0yNy8yMjMxMjVkYmFmMTI3NjY4MTcuanBnIiwicGVybWFuZW50QXZhdGFyIjoiIiwiZW1haWwiOiIxMDU3OTY2NzQ5QHFxLmNvbSIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6IjEzOTU4Njk2OTA5IiwibG9jYXRpb24iOiIiLCJhZGRyZXNzIjpbIiJdLCJhZmZpbGlhdGlvbiI6IiIsInRpdGxlIjoiIiwiaWRDYXJkVHlwZSI6IiIsImlkQ2FyZCI6IiIsImhvbWVwYWdlIjoiIiwiYmlvIjoiIiwicmVnaW9uIjoiIiwibGFuZ3VhZ2UiOiIiLCJnZW5kZXIiOiIiLCJiaXJ0aGRheSI6IiIsImVkdWNhdGlvbiI6IiIsInNjb3JlIjowLCJrYXJtYSI6MCwicmFua2luZyI6MCwiaXNEZWZhdWx0QXZhdGFyIjpmYWxzZSwiaXNPbmxpbmUiOmZhbHNlLCJpc0FkbWluIjpmYWxzZSwiaXNHbG9iYWxBZG1pbiI6ZmFsc2UsImlzRm9yYmlkZGVuIjpmYWxzZSwiaXNEZWxldGVkIjpmYWxzZSwic2lnbnVwQXBwbGljYXRpb24iOiJoYWl6ZWl4IiwiaGFzaCI6IiIsInByZUhhc2giOiIiLCJjcmVhdGVkSXAiOiIxMjcuMC4wLjEiLCJsYXN0U2lnbmluVGltZSI6IiIsImxhc3RTaWduaW5JcCI6IiIsImdpdGh1YiI6IiIsImdvb2dsZSI6IiIsInFxIjoiIiwid2VjaGF0IjoiIiwidW5pb25JZCI6IiIsImZhY2Vib29rIjoiIiwiZGluZ3RhbGsiOiIiLCJ3ZWlibyI6IiIsImdpdGVlIjoiIiwibGlua2VkaW4iOiIiLCJ3ZWNvbSI6IiIsImxhcmsiOiIiLCJnaXRsYWIiOiIiLCJhZGZzIjoiIiwiYmFpZHUiOiIiLCJhbGlwYXkiOiIiLCJjYXNkb29yIjoiIiwiaW5mb2Zsb3ciOiIiLCJhcHBsZSI6IiIsImF6dXJlYWQiOiIiLCJzbGFjayI6IiIsInN0ZWFtIjoiIiwiYmlsaWJpbGkiOiIiLCJva3RhIjoiIiwiZG91eWluIjoiIiwiY3VzdG9tIjoiIiwid2ViYXV0aG5DcmVkZW50aWFscyI6bnVsbCwibGRhcCI6IiIsInByb3BlcnRpZXMiOnt9LCJyb2xlcyI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsIm5vbmNlIjoiZTE5MmU1ZWE1N2EwYjc4ZTdiYTEwYjFiNGM4ZDcwNDgiLCJzY29wZSI6InBob25lIGVtYWlsIHByb2ZpbGUgb3BlbmlkIiwiaXNzIjoiaHR0cHM6Ly9wYXNzcG9ydC5oYWl6ZWl4LmNvbSIsInN1YiI6Ijc1ZjdiNzdjLTI4M2MtNDRhNy04NzUwLTExYjZhN2MxZDdjZCIsImF1ZCI6WyI4ZDlmODM3ZTRlOGVlOGU3N2E0YiJdLCJleHAiOjE2NjQxNTg2MzksIm5iZiI6MTY2MzU1MzgzOSwiaWF0IjoxNjYzNTUzODM5fQ.f0Laa6oSPsEhNnrKriKvsKJGHeJh1PH7RM4N6KhcyQhbNt2fxnB1dhtnZLE0qZIsRB-GDL_yicAKSAdVOQQwLUx2pBDxHbamfgKYD89nzNnrr-JCZuRFatGZQee8zYL6c7WOE-e8eYSY2ouS0_rnBn0Ct_18f7u6Eq1fU7Jkvim6VbIiqKTeD4vSTW6xfnjEFYDJsCpvYi5Sb5Ixro0IdwjEnXs3AFxzVBEJa4-Gl5EH6vcidhrWDITRB1Pcfs2UWCFaO_khD_4ZCdMkpRhvG9l4cNLIyzVaaHz0T29M_LSJJ0hfvp-b1ug8QTDKPZeYJGW2Q13oT7FopjIh9KDP8d5Ah4Pd4uyAkHC8h7_6qs55zPLiLhjTPzP_b9hXBIdJQdy5wuQxADHw-i3_HG0oZkNC40EFUnylo4KloDYmrGeY-Sfli0h7t-MB4bqnI_FRyG9fkF1C8_CcYxQdAM2MQCfpCiioOCJjVxe0zRjd2gQ0KEy8GhgmYrJOAhhvGfRY_1Sb540r1T2hKqF_x6rpJbHxCOwgBtj9Teq23gqLAFFB8mIUwzrDoShcDcQvUp9YNeMHBWpn-pkuE3kpHTOfrP80E-GpQ4oZobxmrInUel_0OR-L51VAheH54cA_3w_vspf7XP3QnZQHyJtcKpXozHx-qK5Txp45KqRByL0EMpI; uoj_username=9531; uoj_username_checksum=78e3c885e436bb4f5840b3120b73b0e0; uoj_remember_token=poZIlxQntw4VkQjMaLUqDHEXXqRlsgpIwJqlOqpMLAhoBWnTFTW6XFjMb8hT; uoj_remember_token_checksum=d231413b81dc1a761020462571061441; uoj_source_code_form_group_preferred_upload_type=advanced; uoj_text_file_form_group_preferred_upload_type=advanced',
};
const lang_list = ['c', 'cpp'];
// config end
const rootpath = path.resolve('./');
const dirpath = path.resolve(rootpath, ownpath);
const list = [];
const errno = [];
function run(idx, needNext) {
  if (idx === list.length) {
    console.log('===FINALLY===');
    console.log(`success : ${list.length - errno.length}`);
    console.log(`error   : ${errno.length}`);
    console.log('errno', errno);
    return;
  }
  const no = list[idx];
  console.log(`======\nno = ${no}`);
  console.log(`GET https://oj.haizeix.com/submissions?problem_id=${no}`);
  axios
    .get(`https://oj.haizeix.com/submissions?problem_id=${no}`, { headers })
    .then(res => {
      const $ = cheerio.load(res.data);
      const item = Array.from($('.table a')).filter(v => v.children[0].data === '100')[0];
      const href = item.attribs.href;
      console.log(`GET https://oj.haizeix.com${href}`);
      return axios.get(`https://oj.haizeix.com${href}`, { headers });
    })
    .then(res => {
      const $ = cheerio.load(res.data);
      lang_list.forEach(lang => load($, no, lang));
    })
    .catch(err => {
      errno.push(no);
      console.log('ERROR', err);
    })
    .finally(() => {
      if (needNext) run(idx + 1, needNext);
    });
}
async function init() {
  await axios.get(`https://oj.haizeix.com/user/profile/${id}`, { headers }).then(res => {
    const $ = cheerio.load(res.data);
    const a = Array.from($('.list-group-item-text a'));
    console.log(`ac count : ${a.length}`);
    for (const item of a) {
      const no = item.children[0].data;
      list.push(Number(no));
    }
  });
}
function load($, no, suffix) {
  try {
    const name = Array.from($('a[href]'))
      .find(v => v.attribs.href.startsWith('/problem/'))
      ?.children[0].data.replace('#', '');
    const code = Array.from($(`.sh_${suffix}`))[0].children[0].data;
    const filepath = path.resolve(dirpath, `./${name}.${suffix}`);
    console.log('WRITE ' + `${name}.${suffix}`);
    fs.writeFileSync(filepath, code);
  } catch (err) {}
}
async function main() {
  fs.ensureDirSync(dirpath);
  // fs.emptyDirSync(dirpath);
  await init();
  // slow
  run(0, true);
  // fast
  // list.forEach((_, i) => run(i, false));
}
main();
