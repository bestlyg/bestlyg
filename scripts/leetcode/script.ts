import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';

const path = resolve('../../2020.11-洪普科技/项目留档/runing');
const dirs = fs.readdirSync(path);
for (const dir of dirs) {
  const modulesPath = `${path}\\${dir}\\dist`;
  console.log(`=======\nremove ${modulesPath}`);
  try {
    fs.removeSync(modulesPath);
  } catch (err) {
    console.log('ERROR');
    console.log(err);
  }
}
