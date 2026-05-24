/** API JSON 中日期字段在前后端之间允许保留 Date 或序列化后的字符串。 */
export type DateValue = Date | string;

/** 左侧导航中的叶子菜单项。 */
export interface SidebarItem {
    name: string;
    link: string;
}

/** 左侧导航分组，允许递归嵌套子分组。 */
export interface SidebarGroup {
    name: string;
    items?: SidebarItem[];
    groups?: SidebarGroup[];
}

/** 左侧导航接口返回的根结构。 */
export interface Sidebar {
    groups?: SidebarGroup[];
}

/** 服务端实体暴露给前端时共享的基础字段。 */
export interface EntityBase {
    id: string;
    createdTime: DateValue;
    updatedTime: DateValue;
}

/** 账本消费/收入类型。 */
export enum LedgerType {
    Generally = 'Generally',
    Drinks = 'Drinks',
    Food = 'Food',
    Transportation = 'Transportation',
    RedEnvelope = 'RedEnvelope',
    Taobao = 'Taobao',
    Rent = 'Rent',
    PhoneBill = 'PhoneBill',
    DailyNecessities = 'DailyNecessities',
    Drug = 'Drug',
    BuyGroceries = 'BuyGroceries',
    Movie = 'Movie',
    Snack = 'Snack',
    Fruit = 'Fruit',
    ClothesShoesBags = 'ClothesShoesBags',
    SkinMakeup = 'SkinMakeup',
    Salary = 'Salary',
    FamilyWallet = 'FamilyWallet',
    BreakfastWallet = 'BreakfastWallet',
    LunchWallet = 'LunchWallet',
    DinnerWallet = 'DinnerWallet',
    TravelWallet = 'TravelWallet',
}

/** 账本来源人。 */
export enum LedgerFrom {
    Lyg = 'Lyg',
    Yzx = 'Yzx',
}

/** 账本类型的展示文案映射。 */
export const ledgerTypeRecord: Record<LedgerType, { label: string; type: LedgerType }> = {
    Generally: { label: '一般', type: LedgerType.Generally },
    Drinks: { label: '酒水饮料', type: LedgerType.Drinks },
    Food: { label: '餐饮', type: LedgerType.Food },
    Transportation: { label: '交通', type: LedgerType.Transportation },
    RedEnvelope: { label: '红包', type: LedgerType.RedEnvelope },
    Taobao: { label: '淘宝', type: LedgerType.Taobao },
    Rent: { label: '房租', type: LedgerType.Rent },
    PhoneBill: { label: '话费', type: LedgerType.PhoneBill },
    DailyNecessities: { label: '生活用品', type: LedgerType.DailyNecessities },
    Drug: { label: '药品', type: LedgerType.Drug },
    BuyGroceries: { label: '买菜', type: LedgerType.BuyGroceries },
    Movie: { label: '电影', type: LedgerType.Movie },
    Snack: { label: '零食', type: LedgerType.Snack },
    Fruit: { label: '水果', type: LedgerType.Fruit },
    ClothesShoesBags: { label: '衣服鞋包', type: LedgerType.ClothesShoesBags },
    SkinMakeup: { label: '护肤彩妆', type: LedgerType.SkinMakeup },
    Salary: { label: '工资', type: LedgerType.Salary },
    FamilyWallet: { label: '小家花钱包', type: LedgerType.FamilyWallet },
    BreakfastWallet: { label: '早餐月月包', type: LedgerType.BreakfastWallet },
    LunchWallet: { label: '中饭菜钱包', type: LedgerType.LunchWallet },
    DinnerWallet: { label: '晚餐小荷包', type: LedgerType.DinnerWallet },
    TravelWallet: { label: '一起环游世界', type: LedgerType.TravelWallet },
};

/** LeetCode 题解使用的语言类型。 */
export enum LeetcodeScriptType {
    javascript = 'javascript',
    typescript = 'typescript',
    python = 'python',
    csharp = 'csharp',
    c = 'c',
    cpp = 'cpp',
    java = 'java',
    go = 'go',
    rust = 'rust',
    sql = 'sql',
}

/** LeetCode 题目难度。 */
export enum LeetcodeLevelType {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

/** 前端消费的 Casbin 规则 DTO。 */
export type CasbinRule = Partial<
    EntityBase & {
        ptype: string;
        p0: string;
        p1: string;
        p2: string;
        p3: string;
        p4: string;
        p5: string;
    }
>;

/** 前端消费的账本记录 DTO。 */
export type Ledger = Partial<
    EntityBase & {
        date: DateValue;
        balance: number;
        comment: string;
        io: boolean;
        from?: LedgerFrom;
        bank?: string;
        type: LedgerType;
    }
>;

/** 前端消费的密钥 DTO。 */
export type Secrets = Partial<
    EntityBase & {
        name: string;
        data: string;
    }
>;

/** 前端消费的 serverless 函数 DTO。 */
export type Serverless = Partial<
    EntityBase & {
        name: string;
        code: string;
    }
>;

/** 前端消费的用户 DTO。 */
export type User = Partial<
    EntityBase & {
        name: string;
        pwd: string;
        avatar: string;
        description: string;
        nickname: string;
    }
>;

/** 前端消费的体重/运动记录 DTO。 */
export type Xuan = Partial<
    EntityBase & {
        date: DateValue;
        weight: number;
        dance_times: number;
    }
>;

/** 前端消费的 LeetCode 题解 DTO。 */
export type LeetcodeSolution = Partial<
    EntityBase & {
        script: LeetcodeScriptType;
        date: DateValue;
        time: number;
        memory: number;
        desc: string;
        code: string;
    }
> & {
    problem: { id: string };
};

/** 前端消费的 LeetCode 题目 DTO，包含题解列表。 */
export type LeetcodeProblem = Partial<
    EntityBase & {
        name: string;
        url: string;
        desc: string;
        tags: string[];
        level: LeetcodeLevelType;
    }
> & {
    solutions: Omit<LeetcodeSolution, 'problem'>[];
};
