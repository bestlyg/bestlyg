import { expect, test as base } from '../../../common/fixtures/test';
import { HomePage } from '../page-objects/home.page';

type BestlygFixtures = {
    homePage: HomePage;
};

export const test = base.extend<BestlygFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export { expect };
export { step } from '../../../common/fixtures/test';
