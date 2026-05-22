import type { Page } from '@playwright/test';
import { logE2EAction } from '../helpers/action-log';

export async function openPage(page: Page, pathname = '/') {
    logE2EAction(`打开页面：${pathname}`);
    await page.goto(pathname);
    logE2EAction('等待页面 DOMContentLoaded');
    await page.waitForLoadState('domcontentloaded');
}
