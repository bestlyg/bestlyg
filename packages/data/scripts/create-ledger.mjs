#!/usr/bin/env node
import '@bestlyg/cli/globals';
import { resolve, decryptPath } from './utils.mjs';
import {
    LEDGER_FORMAT_DAY,
    LEDGER_FORMAT_MONTH,
    LEDGER_FORMAT_YEAR,
    toDayVarName,
    toMonthVarName,
    toYearVarName,
} from '../dist/esm/index.js';

const dayjs = best.dayjs;

const dataPath = resolve(decryptPath, 'ledger', 'data');

async function findLatestDay() {
    const years = (await fs.readdir(dataPath))
        .filter(v => !v.includes('.'))
        .map(v => dayjs(v))
        .sort((a, b) => b.unix() - a.unix());
    const latestYear = resolve(dataPath, years[0].format(LEDGER_FORMAT_YEAR).toString());
    const months = (await fs.readdir(latestYear))
        .filter(v => !v.includes('.'))
        .map(v => dayjs(v))
        .sort((a, b) => b.unix() - a.unix());
    const latestMonth = resolve(
        dataPath,
        latestYear,
        months[0].format(LEDGER_FORMAT_MONTH).toString(),
    );
    const days = (await fs.readdir(latestMonth))
        .filter(v => v !== 'index.ts')
        .map(v => dayjs(v.split('.')[0]))
        .sort((a, b) => b.unix() - a.unix());
    return days[0];
}

async function main(formattedDate) {
    const date = best.dayjs(formattedDate);

    if (!date.isValid()) {
        echo`Invalid Date ${JSON.stringify(argv)}`;
        process.exit(-1);
    }

    const ledgerPath = resolve(dataPath, 'index.ts');
    const yearPath = resolve(dataPath, date.format(LEDGER_FORMAT_YEAR), 'index.ts');
    const monthPath = resolve(
        dataPath,
        date.format(LEDGER_FORMAT_YEAR),
        date.format(LEDGER_FORMAT_MONTH),
        'index.ts',
    );
    const dayPath = resolve(
        dataPath,
        date.format(LEDGER_FORMAT_YEAR),
        date.format(LEDGER_FORMAT_MONTH),
        date.format(LEDGER_FORMAT_DAY) + '.ts',
    );

    async function insertYearToLedger() {
        const varName = toYearVarName(date);
        let fileData = (await fs.readFile(ledgerPath)).toString();
        if (fileData.includes(varName)) return;
        fileData = insertString(fileData, fileData.indexOf('[') + 1, `\n${varName},`);
        fileData = insertString(
            fileData,
            fileData.indexOf('\n') + 1,
            `import ${varName} from './${date.format(LEDGER_FORMAT_YEAR)}/index';\n`,
        );
        await fs.writeFile(ledgerPath, fileData);
    }

    async function createYear() {
        await insertYearToLedger();
        await fs.ensureDir(path.dirname(yearPath));
        await fs.writeFile(
            yearPath,
            `
import { LedgerYearRecord } from '../../types';
const ledgerYearRecord: LedgerYearRecord = {
    date: '${date.format(LEDGER_FORMAT_YEAR)}',
    record: [],
};
export default ledgerYearRecord;
`.trim(),
        );
    }

    async function insertMonthToYear() {
        const varName = toMonthVarName(date);
        let fileData = (await fs.readFile(yearPath)).toString();
        if (fileData.includes(varName)) return;
        fileData = insertString(fileData, fileData.indexOf('[') + 1, `\n${varName},`);
        fileData = insertString(
            fileData,
            fileData.indexOf('\n') + 1,
            `import ${varName} from './${date.format(LEDGER_FORMAT_MONTH)}/index';\n`,
        );
        await fs.writeFile(yearPath, fileData);
    }

    async function createMonth() {
        if (!(await fs.exists(yearPath))) await createYear();
        await insertMonthToYear();
        await fs.ensureDir(path.dirname(monthPath));
        await fs.writeFile(
            monthPath,
            `
import { LedgerMonthRecord } from '../../../types';
const ledgerMonthRecord: LedgerMonthRecord = {
    date: '${date.format(LEDGER_FORMAT_MONTH)}',
    record: [],
};
export default ledgerMonthRecord;
`.trim(),
        );
    }

    async function insertDayToMonth() {
        const varName = toDayVarName(date);
        let fileData = (await fs.readFile(monthPath)).toString();
        if (fileData.includes(varName)) return;
        fileData = insertString(fileData, fileData.indexOf('[') + 1, `\n${varName},`);
        fileData = insertString(
            fileData,
            fileData.indexOf('\n') + 1,
            `import ${varName} from './${date.format(LEDGER_FORMAT_DAY)}';\n`,
        );
        await fs.writeFile(monthPath, fileData);
    }

    async function createDay() {
        if (!(await fs.exists(monthPath))) await createMonth();
        await insertDayToMonth();
        await fs.ensureDir(path.dirname(dayPath));
        await fs.writeFile(
            dayPath,
            `
import { LedgerRecordItemType, LedgerDayRecord } from '../../../types';
const ledgerDayRecord: LedgerDayRecord = {
    date: '${date.format(LEDGER_FORMAT_DAY)}',
    record: [],
};
export default ledgerDayRecord;
`.trim(),
        );
    }

    /**
     * @param {string} str1
     * @param {number} idx
     * @param {string} str2
     */
    function insertString(str1, idx, str2) {
        return str1.substring(0, idx) + str2 + str1.substring(idx);
    }

    await createDay();
    echo`Create ledger success for ${date.format(LEDGER_FORMAT_DAY)}.`;
}

try {
    const now = dayjs().unix();
    let day = await findLatestDay();
    do {
        day = day.add(1, 'day');
        console.log(`Start to create ${day.format(LEDGER_FORMAT_DAY)}`);
        await main(day);
    } while (day.endOf('day').unix() < now);
} catch (err) {
    echo`Error : ${err?.toString()}`;
}
