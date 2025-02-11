import '@bestlyg/cli/globals';
import { execSync } from 'child_process';
import { getNodeConfiguration, ConfigurationSchema } from '@bestlyg/common';

const config = ConfigurationSchema.parse(getNodeConfiguration());
const commands = [`cd ${config.ssh.projectPath}`, `pnpm -w script deploy`];

execSync(`ssh -T ${config.ssh.username}@${config.ssh.ip} "${commands.join('; ')}"`, {
    stdio: 'inherit',
});
