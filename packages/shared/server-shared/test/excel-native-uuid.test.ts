import ExcelJS from 'exceljs';
import { expect, it } from '@rstest/core';

it('round-trips extended Excel conditional formatting with native UUID generation', async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Native UUID');
    sheet.addRow([1]);
    sheet.addRow([2]);
    sheet.addConditionalFormatting({
        ref: 'A1:A2',
        rules: [
            {
                type: 'iconSet',
                iconSet: '3Stars',
                priority: 1,
                cfvo: [
                    { type: 'percent', value: 0 },
                    { type: 'percent', value: 33 },
                    { type: 'percent', value: 67 },
                ],
            },
        ],
    });
    const bytes = await workbook.xlsx.writeBuffer();
    const loaded = new ExcelJS.Workbook();
    await loaded.xlsx.load(bytes);
    const restored = loaded.getWorksheet('Native UUID')!;
    expect(restored.getCell('A2').value).toBe(2);
    expect(restored.conditionalFormattings[0].rules[0]).toMatchObject({
        type: 'iconSet',
        iconSet: '3Stars',
    });
});
