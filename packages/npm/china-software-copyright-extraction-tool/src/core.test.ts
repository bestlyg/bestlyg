import { test, expect } from '@rstest/core';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import PizZip from 'pizzip';

test('loads the built ESM module', async () => {
    const module = await import(new URL('../dist/index.mjs', import.meta.url).href);
    expect(typeof module.chinaSoftwareCopyrightExtractionTool).toBe('function');
});

test('extracts a local source fixture into a Word document', async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'cscet-test-'));
    try {
        await fs.writeFile(
            path.join(directory, 'example.cs'),
            '// ignored comment\npublic class Smoke {}\n',
        );
        const outputPath = path.join(directory, 'output.docx');
        execFileSync(
            process.execPath,
            [
                fileURLToPath(
                    new URL('../bin/china-software-copyright-extraction-tool.mjs', import.meta.url),
                ),
                '--output-path',
                outputPath,
                '--glob-path',
                path.join(directory, '*.cs'),
            ],
            { cwd: directory, stdio: 'pipe' },
        );
        const zip = new PizZip(await fs.readFile(outputPath));
        expect(zip.file('word/document.xml')!.asText()).toContain('public class Smoke {}');
    } finally {
        await fs.rm(directory, { recursive: true, force: true });
    }
});
