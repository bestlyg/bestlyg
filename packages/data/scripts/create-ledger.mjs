#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { resolve, decryptPath } from './utils.mjs';
import { LEDGER_FORMAT_DAY, LEDGER_FORMAT_MONTH, LEDGER_FORMAT_YEAR } from '../dist/esm/index.js';

const { day: _day } = argv;
const day = dayjs(_day);
if (day.isValid()) {
    const filePath = resolve(
        decryptPath,
        'ledger',
        'data',
        day.format(LEDGER_FORMAT_YEAR),
        day.format(LEDGER_FORMAT_MONTH),
        day.format(LEDGER_FORMAT_DAY) + '.ts'
    );
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(
        filePath,
        `
import { LedgerRecordItemType, LedgerDayRecord } from '../../../types';
const ledgerDayRecord: LedgerDayRecord = {
    date: '${day.format(LEDGER_FORMAT_DAY)}',
    record: [],
};
export default ledgerDayRecord;
`.trim()
    );
    echo`Create ${filePath}`;
}
