import '@bestlyg/cli/globals';
import { PrismaClient } from '@bestlyg/common/prisma-client';

export const resolve = best.common.getResolveFunction(best.common.getDirname(), 1);
export const { _, dayjs } = best;
/**
 * @param {string} s
 * @param {(v:import('dayjs').Dayjs)=>import('dayjs').Dayjs} customDayjs
 */
export const getDate = (s, customDayjs = v => v) => new Date(customDayjs(dayjs(s)).format('YYYY-MM-DD'));
export const nDaysAgo = n => getDate(undefined, v => v.subtract(n, 'day'));
export const today = nDaysAgo(0);
export const yesterday = nDaysAgo(1);

export const prisma = new PrismaClient();