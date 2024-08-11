export type LeetCodeDataList = LeetCodeData[];
export interface LeetCodeData {
    dirName: string;
    dirPath: string;
    problems: {
        problemName: string;
        problemPath: string;
        problemData: LeetCodeProblem;
    }[];
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
    markdownCount: number;
    solutionCount: number;
    index: LeetCodeReadmeDataItem[];
    tag: LeetCodeReadmeDataItem[];
    level: LeetCodeReadmeDataItem[];
}
