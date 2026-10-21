import { test, step } from '../../fixtures/test';

test.describe('Bestlyg 冒烟测试', () => {
    test('首页可以打开 @smoke', async ({ homePage }) => {
        await step('打开首页', async () => {
            await homePage.open();
        });

        await step('确认应用挂载', async () => {
            await homePage.expectAppMounted();
        });
    });
});
