export type LeetCodeDataList = LeetCodeData[];
export interface LeetCodeData {
    dirName: string;
    dirPath: string;
    problems: LeetCodeProblemDataList;
}
export type LeetCodeProblemDataList = LeetCodeProblemData[];
export interface LeetCodeProblemData {
    problemName: string;
    problemPath: string;
    problemData: LeetCodeProblem;
}
export interface LeetCodeSolution {
    script: string;
    date?: string;
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
    // level: 'Easy' | 'Medium' | 'Hard';
    level: string;
    tagList: string[];
    solutions: LeetCodeSolution[];
}
export interface LeetCodeReadmeDataItem {
    label: string;
    problems: string[];
}
export interface LeetCodeReadmeData {
    problemCount: number;
    solutionCount: number;
    index: LeetCodeReadmeDataItem[];
    tag: LeetCodeReadmeDataItem[];
    level: LeetCodeReadmeDataItem[];
}

export enum LeetCodeLevel {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export enum LeetCodeScript {
    JS = 'javascript',
    TS = 'typescript',
    PY = 'python',
    CS = 'c#',
    C = 'c',
    CPP = 'cpp',
    JAVA = 'java',
    GO = 'go',
    RUST = 'rust',
}

export interface LeetCodeGraphQLQuery {
    operationName?: string;
    variables?: { [key: string]: unknown };
    query: string;
    headers?: { [key: string]: string };
}
