import { defineConfig } from '@rstest/core';
import { buildRstestConfig } from './src/rstest';

export default defineConfig(await buildRstestConfig());
