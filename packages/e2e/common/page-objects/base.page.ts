import { expect, type Locator, type Page } from '@playwright/test';
import { formatE2EActionValue, logE2EAction, type E2EActionValueLogOptions } from '../helpers/action-log';

export interface E2EFillOptions extends E2EActionValueLogOptions {}

export class BasePage {
    constructor(protected readonly page: Page) {}

    dataTid(tid: string): Locator {
        return this.page.locator(`[data-tid="${tid}"]`);
    }

    dataTidPrefix(prefix: string): Locator {
        return this.page.locator(`[data-tid^="${prefix}"]`);
    }

    dataTidWithin(parent: Locator, tid: string): Locator {
        return parent.locator(`[data-tid="${tid}"]`);
    }

    async expectDataTidVisible(tid: string, timeout = 20_000) {
        logE2EAction(`等待节点可见：data-tid="${tid}"`);
        const locator = this.dataTid(tid);
        await expect(locator).toBeVisible({ timeout });
        return locator;
    }

    async expectDataTidHidden(tid: string, timeout = 20_000) {
        logE2EAction(`等待节点隐藏：data-tid="${tid}"`);
        await expect(this.dataTid(tid)).toBeHidden({ timeout });
    }

    async expectDataTidValue(tid: string, value: string, timeout = 20_000, label?: string) {
        logE2EAction(`确认节点取值：${label ?? `data-tid="${tid}"`}，值="${value}"`);
        await expect(this.dataTid(tid)).toHaveValue(value, { timeout });
    }

    async expectLocatorVisible(locator: Locator, label: string, timeout = 20_000) {
        logE2EAction(`等待节点可见：${label}`);
        await expect(locator).toBeVisible({ timeout });
        return locator;
    }

    async expectLocatorHidden(locator: Locator, label: string, timeout = 20_000) {
        logE2EAction(`等待节点隐藏：${label}`);
        await expect(locator).toBeHidden({ timeout });
    }

    async waitForDataTid(tid: string, timeout = 20_000) {
        return this.expectDataTidVisible(tid, timeout);
    }

    async waitForDataTidAttached(tid: string, timeout = 20_000) {
        logE2EAction(`等待节点挂载：data-tid="${tid}"`);
        const locator = this.dataTid(tid);
        await locator.waitFor({ state: 'attached', timeout });
        return locator;
    }

    async goto(pathname = '/', label?: string) {
        logE2EAction(`打开页面：${label ?? pathname}`);
        await this.page.goto(pathname);
    }

    async clickDataTid(tid: string, timeout = 20_000, label?: string) {
        const locator = await this.expectDataTidVisible(tid, timeout);
        logE2EAction(`点击：${label ?? `data-tid="${tid}"`}`);
        await locator.click();
    }

    async clickLocator(locator: Locator, label: string, timeout = 20_000) {
        await this.expectLocatorVisible(locator, label, timeout);
        logE2EAction(`点击：${label}`);
        await locator.click();
    }

    async fillDataTid(tid: string, value: string, timeout = 20_000, label?: string, options: E2EFillOptions = {}) {
        const locator = await this.expectDataTidVisible(tid, timeout);
        const displayValue = formatE2EActionValue(value, options);
        logE2EAction(`输入：${label ?? `data-tid="${tid}"`}，值="${displayValue}"`);
        await locator.fill(value);
    }

    async fillLocator(locator: Locator, value: string, label: string, timeout = 20_000, options: E2EFillOptions = {}) {
        await this.expectLocatorVisible(locator, label, timeout);
        const displayValue = formatE2EActionValue(value, options);
        logE2EAction(`输入：${label}，值="${displayValue}"`);
        await locator.fill(value);
    }

    async pressKeyboard(key: string, label?: string) {
        logE2EAction(`键盘按键：${label ?? key}`);
        await this.page.keyboard.press(key);
    }

    async insertKeyboardText(value: string, label?: string, options: E2EFillOptions = {}) {
        const displayValue = formatE2EActionValue(value, options);
        logE2EAction(`键盘输入：${label ?? '文本'}，值="${displayValue}"`);
        await this.page.keyboard.insertText(value);
    }

    async waitForTimeout(timeout: number, label?: string) {
        logE2EAction(`等待：${label ?? `${timeout}ms`}`);
        await this.page.waitForTimeout(timeout);
    }
}
