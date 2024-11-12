/**
 * @typedef {import("../dist/types").Ledger} Ledger
 * @typedef {import("../dist/types").LedgerDayRecord} LedgerDayRecord
 * @typedef {import("../dist/types").LedgerMonthRecord} LedgerMonthRecord
 * @typedef {import("../dist/types").LedgerYearRecord} LedgerYearRecord
 */

import '@bestlyg/cli/globals';
import { resolve } from './utils.mjs';
import {
    ledger,
    LEDGER_FORMAT_DAY,
    LEDGER_FORMAT_MONTH,
    LEDGER_FORMAT_YEAR,
    toDayVarName,
    toMonthVarName,
    toYearVarName,
} from '../dist/esm/index.js';

const dayjs = best.dayjs;
const rootPath = resolve('recreate');

/**
 * @param {Ledger} ledger
 */
async function createLedger(ledger) {
    const filePath = resolve(rootPath, 'index.ts');
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(
        filePath,
        `
import { Ledger } from '../types';
${ledger.map(item => `import ${toYearVarName(item.date)} from './${item.date}/index';`).join('\n')}
export const ledger: Ledger = [
${ledger.map(item => toYearVarName(item.date)).join(',')}
];
`
    );

    return Promise.all(ledger.map(createYear));
}

/**
 * @param {LedgerYearRecord} record
 */
async function createYear(record) {
    const date = dayjs(record.date);
    const filePath = resolve(rootPath, date.format(LEDGER_FORMAT_YEAR), 'index.ts');
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(
        filePath,
        `
import { LedgerYearRecord } from '../../types';
${record.record
    .map(item => `import ${toMonthVarName(item.date)} from './${item.date}/index';`)
    .join('\n')}
const ledgerYearRecord: LedgerYearRecord = {
    date: '${record.date}',
    record: [
${record.record.map(item => toMonthVarName(item.date)).join(',')}
    ],
};
export default ledgerYearRecord;
`
    );
    return Promise.all(record.record.map(createMonth));
}

/**
 * @param {LedgerMonthRecord} record
 */
async function createMonth(record) {
    const date = dayjs(record.date);
    const filePath = resolve(
        rootPath,
        date.format(LEDGER_FORMAT_YEAR),
        date.format(LEDGER_FORMAT_MONTH),
        'index.ts'
    );
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(
        filePath,
        `
import { LedgerMonthRecord } from '../../../types';
${record.record.map(item => `import ${toDayVarName(item.date)} from './${item.date}';`).join('\n')}
const ledgerMonthRecord: LedgerMonthRecord = {
    date: '${record.date}',
    record: [
${record.record.map(item => toDayVarName(item.date)).join(',')}
    ],
};
export default ledgerMonthRecord;
`
    );
    return Promise.all(record.record.map(createDay));
}

/**
 * @param {LedgerDayRecord} record
 */
async function createDay(record) {
    const date = dayjs(record.date);
    const filePath = resolve(
        rootPath,
        date.format(LEDGER_FORMAT_YEAR),
        date.format(LEDGER_FORMAT_MONTH),
        date.format(LEDGER_FORMAT_DAY) + '.ts'
    );
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(
        filePath,
        `
import { LedgerRecordItemType, LedgerDayRecord } from '../../../types';
const ledgerDayRecord: LedgerDayRecord = {
    date: '${record.date}',
    record: [
${record.record
    .map(item => {
        return `{ io: ${item.io}, type: LedgerRecordItemType.${item.type}, money: ${item.money}, comment: '${item.comment}' }`;
    })
    .join(',\n')}
    ],
};
export default ledgerDayRecord;
`
    );
}

try {
    await createLedger(ledger);
    echo`Recreate ledger success.`;
} catch (err) {
    echo`Error : ${err?.toString()}`;
}
