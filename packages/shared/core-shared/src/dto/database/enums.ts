import { LedgerFrom, LedgerType, LeetcodeLevelType, LeetcodeScriptType } from '../../bestlyg-types';

export const ledgerTypeValues = Object.values(LedgerType) as [LedgerType, ...LedgerType[]];

export const ledgerFromValues = Object.values(LedgerFrom) as [LedgerFrom, ...LedgerFrom[]];

export const leetcodeScriptTypeValues = Object.values(LeetcodeScriptType) as [
    LeetcodeScriptType,
    ...LeetcodeScriptType[],
];

export const leetcodeLevelTypeValues = Object.values(LeetcodeLevelType) as [
    LeetcodeLevelType,
    ...LeetcodeLevelType[],
];
