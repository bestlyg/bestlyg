import '@bestlyg/cli/globals';
import { resolve } from './utils.mjs';
import {
    ledger,
    LEDGER_FORMAT_DAY,
    LEDGER_FORMAT_MONTH,
    LedgerRecordItemType,
    LEDGER_FORMAT_YEAR,
} from '../dist/esm/index.js';

const map = Object.fromEntries(Object.entries(LedgerRecordItemType).map(([k, v]) => [v, k]));
/**
 *
 * @param {string} data
 * @returns
 */
function formatData(data) {
    return data.replace(/"type":"(.*?)"/g, (searchValue, matchedValue) => {
        return `"type":LedgerRecordItemType.${map[matchedValue]}`;
    });
}

for (const yearRecord of ledger) {
    const date = dayjs(yearRecord.date);
    const filePath = resolve(
        'src',
        'ledger',
        'data',
        date.format(LEDGER_FORMAT_YEAR),
        'index' + '.ts'
    );
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(
        filePath,
        [
            `import { LedgerYearRecord } from '../../types';`,
            ...yearRecord.record.map(
                item =>
                    `import ledgerMonthRecord_${item.date.replace(/-/g, '_')} from './${
                        item.date
                    }/index';`
            ),
            `const ledgerYearRecord: LedgerYearRecord = {`,
            `    date: '${yearRecord.date}',`,
            `    record: [`,
            ...yearRecord.record.map(item => `ledgerMonthRecord_${item.date.replace(/-/g, '_')},`),
            `    ],`,
            `};`,
            `export default ledgerYearRecord;`,
        ].join('\n')
    );

    for (const monthRecord of yearRecord.record) {
        const date = dayjs(monthRecord.date);
        const filePath = resolve(
            'src',
            'ledger',
            'data',
            date.format(LEDGER_FORMAT_YEAR),
            date.format(LEDGER_FORMAT_MONTH),
            'index' + '.ts'
        );
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeFile(
            filePath,
            [
                `import { LedgerRecordItemType, LedgerMonthRecord } from '../../../types';`,
                ...monthRecord.record.map(
                    item =>
                        `import ledgerDayRecord_${item.date.replace(/-/g, '_')} from './${
                            item.date
                        }';`
                ),
                `const ledgerMonthRecord: LedgerMonthRecord = {`,
                `    date: '${monthRecord.date}',`,
                `    record: [`,
                ...monthRecord.record.map(
                    item => `ledgerDayRecord_${item.date.replace(/-/g, '_')},`
                ),
                `    ],`,
                `};`,
                `export default ledgerMonthRecord;`,
            ].join('\n')
        );

        for (const dateRecord of monthRecord.record) {
            const date = dayjs(dateRecord.date);
            const filePath = resolve(
                'src',
                'ledger',
                'data',
                date.format(LEDGER_FORMAT_YEAR),
                date.format(LEDGER_FORMAT_MONTH),
                date.format(LEDGER_FORMAT_DAY) + '.ts'
            );
            await fs.ensureDir(path.dirname(filePath));
            await fs.writeFile(
                filePath,
                [
                    `import { LedgerRecordItemType, LedgerDayRecord } from '../../../types';`,
                    `const ledgerDayRecord: LedgerDayRecord = ${formatData(
                        JSON.stringify(dateRecord)
                    )}`,
                    'export default ledgerDayRecord;',
                ].join('\n')
            );
        }
    }
}

const filePath = resolve(
    'src',
    'ledger',
    'data',
    'index' + '.ts'
);
await fs.ensureDir(path.dirname(filePath));
await fs.writeFile(
    filePath,
    [
        `import { Ledger } from '../types';`,
        ...ledger.map(
            item =>
                `import ledgerYearRecord_${item.date.replace(/-/g, '_')} from './${
                    item.date
                }/index';`
        ),
        `export const ledger: Ledger = [`,
        ...ledger.map(item => `ledgerYearRecord_${item.date.replace(/-/g, '_')},`),
        `];`,
    ].join('\n')
);