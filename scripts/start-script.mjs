import 'zx/globals';

const scriptPath = path.join(__dirname, ...argv._) + '.*';

echo(`ScriptPath = ${scriptPath}`);

const scripts = await glob(scriptPath);

for (const script of scripts) {
    echo(`Run ${script}`);
    await $`zx ${script}`;
}
