import { defineConfig } from '@playwright/test';
import { buildPlaywrightConfig } from './src';

export default defineConfig(await buildPlaywrightConfig());
