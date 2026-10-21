import { expect, test } from '../../fixtures/test';

test('login encrypts the password and persists Jotai state @smoke', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/api/**', async (route) => {
        await route.fulfill({
            json: {
                code: 0,
                data: route.request().url().endsWith('/auth/login')
                    ? {
                          username: 'upgrade-test',
                          nickname: 'Upgrade Test',
                          access_token: 'test-token',
                      }
                    : [],
            },
        });
    });
    await page.goto('/login');
    await page.getByLabel('用户名', { exact: true }).fill('upgrade-test');
    await page.getByLabel('密码', { exact: true }).fill('中文 password');
    const request = page.waitForRequest('**/api/auth/login');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    const payload = (await request).postDataJSON();
    expect(payload.username).toBe('upgrade-test');
    expect(payload.password).not.toBe('中文 password');
    expect(payload.password).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
    await expect
        .poll(() => page.evaluate(() => localStorage.getItem('x-token')))
        .toBe('test-token');
    await expect
        .poll(() =>
            page.evaluate(() => JSON.parse(localStorage.getItem('userInfo') ?? 'null')?.nickname),
        )
        .toBe('Upgrade Test');
    await page.goto('/login');
    await expect(page).toHaveURL(/\/docs\/?$/);
    expect(errors).toEqual([]);
});

test('Monaco loads its TypeScript worker and edits code @smoke', async ({ page }) => {
    const errors: string[] = [];
    const workers: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('worker', (worker) => workers.push(worker.url()));
    await page.route('**/api/**', (route) => route.fulfill({ json: { code: 0, data: [] } }));
    await page.goto('/application/serverless');
    const editor = page.locator('.monaco-editor').first();
    await expect(editor).toBeVisible();
    await editor.click();
    await page.keyboard.insertText('const answer: number = 42;');
    await expect(editor.locator('.view-lines')).toContainText('const answer: number = 42;');
    await expect.poll(() => workers.some((url) => /ts\.worker/.test(url))).toBe(true);
    expect(errors).toEqual([]);
});
