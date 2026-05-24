import { CasbinRuleModule } from './casbin-rule';
import { LedgerModule } from './ledger';
import { LeetcodeProblemModule } from './leetcode-problem';
import { LeetcodeSolutionModule } from './leetcode-solution';
import { SecretsModule } from './secrets';
import { ServerlessModule } from './serverless';
import { UserModule } from './user';
import { XuanModule } from './xuan';

export * from './casbin-rule';
export * from './ledger';
export * from './leetcode-problem';
export * from './leetcode-solution';
export * from './secrets';
export * from './serverless';
export * from './user';
export * from './xuan';

export const databaseResourceModules = [
    LedgerModule,
    UserModule,
    XuanModule,
    SecretsModule,
    CasbinRuleModule,
    ServerlessModule,
    LeetcodeProblemModule,
    LeetcodeSolutionModule,
];
