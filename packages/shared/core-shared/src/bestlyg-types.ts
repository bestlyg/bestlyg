export type DateValue = Date | string;

export interface SidebarItem {
    name: string;
    link: string;
}

export interface SidebarGroup {
    name: string;
    items?: SidebarItem[];
    groups?: SidebarGroup[];
}

export interface Sidebar {
    groups?: SidebarGroup[];
}

export interface EntityBase {
    id: string;
    createdTime: DateValue;
    updatedTime: DateValue;
}

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

export enum LedgerFrom {
    Lyg = 'Lyg',
    Yzx = 'Yzx',
}

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

export enum LeetcodeLevelType {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

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

export type Xuan = Partial<
    EntityBase & {
        date: DateValue;
        weight: number;
        dance_times: number;
    }
>;

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
