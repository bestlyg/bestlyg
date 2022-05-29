import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common, sequence } from '@bestlyg/algorithms/src';
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

const ipv4Reg = /^[0-9]*$/;
function _checkIPV4(item: string): boolean {
  if (!ipv4Reg.test(item)) return false;
  if (item.length > 1 && item[0] === '0') return false;
  if (parseInt(item) > 255) return false;
  return true;
}
function checkIPV4(str: string): boolean {
  const items = str.split('.');
  if (items.length !== 4) return false;
  return items.every(_checkIPV4);
}
const ipv6Reg = /^[0-9a-fA-F]*$/;
function _checkIPV6(item: string): boolean {
  if (!ipv6Reg.test(item)) return false;
  return true;
}
function checkIPV6(str: string): boolean {
  const items = str.split(':');
  if (items.length !== 8) return false;
  return items.every(_checkIPV6);
}
function validIPAddress(queryIP: string): string {
  if (checkIPV4(queryIP)) return 'IPv4';
  if (checkIPV6(queryIP)) return 'IPv6';
  return 'Neither';
}
