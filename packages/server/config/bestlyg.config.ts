import { ConfigurationSchema, getConfiguration } from '@bestlyg/server-shared';
import { defineConfig } from './utils';

const config = ConfigurationSchema.parse(getConfiguration());

export default defineConfig({
    ...config,
});
