export interface Account {
    _id: string;
    createTime: string;
    isPositive: boolean;
    money: number;
    name: string;
    updateTime: string;
}

export interface Type {
    _id: string;
    name: string;
}

export interface Bill {
    accountId: string;
    createTime: string;
    date: string;
    deleted: boolean;
    desc: string;
    money: number;
    remark: string;
    typeId: string;
    updateTime: string;
    userId: string;
    _id: string;
}
