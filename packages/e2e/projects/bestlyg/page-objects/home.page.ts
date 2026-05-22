import { expect } from '@playwright/test';
import { BasePage } from '../../../common/page-objects/base.page';
import { logE2EAction } from '../../../common/helpers/action-log';

export class HomePage extends BasePage {
    async open() {
        await this.goto('/', 'Bestlyg 首页');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async expectAppMounted() {
        logE2EAction('确认 React 根节点已挂载');
        await expect(this.page.locator('#root')).toBeAttached();
        await expect(this.page.locator('body')).toBeVisible();
    }
}
