export type LeetCodeDataList = LeetCodeData[];
export interface LeetCodeData {
    dirName: string;
    dirPath: string;
    problems: LeetCodeProblem[];
}
export interface LeetCodeSolution {
    script: string;
    date?: number;
    time: number;
    memory: number;
    desc: string;
    code: string;
}
export interface LeetCodeProblem {
    exist?: boolean;
    id?: string;
    name: string;
    url: string;
    desc: string;
    difficulty: LeetCodeDifficulty;
    tag: string[];
    solutions: LeetCodeSolution[];
}
export interface LeetCodeReadmeDataItem {
    dirName: string;
    problems: string[];
}
export enum LeetCodeDifficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}
export interface LeetCodeReadmeData {
    markdownCount: number;
    solutionCount: number;
    index: LeetCodeReadmeDataItem[];
    tag: LeetCodeReadmeDataItem[];
    difficulty: LeetCodeReadmeDataItem[];
}
