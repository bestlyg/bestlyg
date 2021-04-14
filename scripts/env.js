const fs = require('fs-extra');
const path = require('path');
const resolve = (...p) => path.resolve.apply({}, [__dirname, '../', ...p]);
const dirsPath = resolve('packages/leetcode/src');
const dirs = fs.readdirSync(dirsPath).filter(v => v !== 'index.md');
/**
 * @param {string} file
 */
const getOrder = file => {
  if (file.startsWith('LCP')) {
    return parseFloat(file.substr('LCP'.length));
  } else if (file.startsWith('面试题')) {
    return parseFloat(file.substr('面试题'.length));
  } else if (file.startsWith('剑指Offer')) {
    return parseFloat(file.substr('剑指Offer'.length));
  } else {
    return parseFloat(file);
  }
};
/**
 * @param {string} file
 */
const getDirOrder = file => {
  if (file.startsWith('LCP')) {
    return 300000;
  } else if (file.startsWith('面试题')) {
    return 100000;
  } else if (file.startsWith('剑指Offer')) {
    return 200000;
  } else {
    return parseFloat(file);
  }
};
for (const dir of dirs) {
  const filesPath = dirsPath + '/' + dir;
  const files = fs.readdirSync(filesPath);
  for (const file of files) {
    const filePath = filesPath + '/' + file;
    let data = fs.readFileSync(filePath).toString();
    data = data.replace('path: /leetcode', 'path: /leetcode\n  order: 3');
    fs.writeFileSync(filePath, data);
  }
}
