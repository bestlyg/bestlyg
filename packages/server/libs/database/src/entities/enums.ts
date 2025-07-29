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
