import { expect, test as base, withStepLogging } from '../../../common/fixtures/test';
import { HomePage } from '../page-objects/home.page';

type BestlygFixtures = {
    homePage: HomePage;
};

export const test = withStepLogging(
    base.extend<BestlygFixtures>({
        homePage: async ({ page }, use) => {
            await use(new HomePage(page));
        },
    }),
);

export { expect };
