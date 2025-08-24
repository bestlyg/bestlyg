import type {
    CasbinRule as CasbinRuleEntity,
    LeetcodeProblem as LeetcodeProblemEntity,
    LeetcodeSolution as LeetcodeSolutionEntity,
    Ledger as LedgerEntity,
    Secrets as SecretsEntity,
    Serverless as ServerlessEntity,
    User as UserEntity,
    Xuan as XuanEntity,
} from '../libs/database/src/entities';

export * from '../libs/database/src/entities/enums';

type ConvertDateToUnion<T> = {
    [K in keyof T]: T[K] extends Date
        ? Date | string // 如果是Date类型，转换为Date | string
        : T[K] extends object
          ? ConvertDateToUnion<T[K]> // 如果是对象，递归处理
          : T[K]; // 其他类型保持不变
};

export type CasbinRule = Partial<ConvertDateToUnion<CasbinRuleEntity>>;
export type LeetcodeProblem = Omit<
    Partial<ConvertDateToUnion<LeetcodeProblemEntity>>,
    'solutions'
> & {
    solutions: Omit<LeetcodeSolution, 'problem'>[];
};
export type LeetcodeSolution = Omit<
    Partial<ConvertDateToUnion<LeetcodeSolutionEntity>>,
    'problem'
> & { problem: { id: string } };
export type Ledger = Partial<ConvertDateToUnion<LedgerEntity>>;
export type Secrets = Partial<ConvertDateToUnion<SecretsEntity>>;
export type Serverless = Partial<ConvertDateToUnion<ServerlessEntity>>;
export type User = Partial<ConvertDateToUnion<UserEntity>>;
export type Xuan = Partial<ConvertDateToUnion<XuanEntity>>;

export * from '../libs/api/src/api.dto';
