import best from '@bestlyg/cli';

import { resolve, PATH_GRAPHQL } from './utils';

const fs = best.zx.fs;

const read = (file: string) => fs.readFileSync(resolve(PATH_GRAPHQL, file), 'utf8');

export const GRAPHQL_GET_USER_PROFILE = read('getUserProfile.graphql');
export const GRAPHQL_GET_PROBLEM = read('getProblem.graphql');

export interface NumAcceptedQuestion {
    difficulty: string;
    count: number;
}

export interface NumFailedQuestion {
    difficulty: string;
    count: number;
}

export interface NumUntouchedQuestion {
    difficulty: string;
    count: number;
}

export interface UserProfileUserQuestionProgress {
    numAcceptedQuestions: NumAcceptedQuestion[];
    numFailedQuestions: NumFailedQuestion[];
    numUntouchedQuestions: NumUntouchedQuestion[];
}

export interface Medal {
    name: string;
    year: number;
    month: number;
    category: string;
}

export interface Ranking {
    currentLocalRanking: number;
    currentGlobalRanking: number;
    currentRating: string;
    totalLocalUsers: number;
    totalGlobalUsers: number;
}

export interface SocialAccount {
    provider: string;
    profileUrl: string;
}

export interface Profile {
    userSlug: string;
    realName: string;
    aboutMe: string;
    userAvatar: string;
    location: string;
    gender: string;
    websites: string[];
    skillTags: string[];
    contestCount: number;
    asciiCode: string;
    medals: Medal[];
    ranking: number;
    socialAccounts: SocialAccount[];
}

export interface UserProfilePublicProfile {
    username: string;
    haveFollowed?: boolean;
    siteRanking: number;
    profile: Profile;
}

export interface UserResult {
    userProfileUserQuestionProgress: UserProfileUserQuestionProgress;
    userProfilePublicProfile: UserProfilePublicProfile;
}

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface TopicTag {
    name: string;
    slug: string;
    translatedName: string | null;
}
export interface CodeSnippet {
    lang: string;
    langSlug: string;
    code: string;
}

export interface OfficialSolution {
    id: string;
    canSeeDetail: boolean;
    paidOnly: boolean;
    hasVideoSolution: boolean;
    paidOnlyVideo: boolean;
}

export interface ChallengeQuestion {
    id: string;
    date: string;
    incompleteChallengeCount: number;
    streakCount: number;
    type: string;
}

export interface Problem {
    questionId: string;
    questionFrontendId: string;
    boundTopicId: unknown;
    title: string;
    titleSlug: string;
    content: string;
    translatedTitle: string | null;
    translatedContent: string | null;
    isPaidOnly: boolean;
    difficulty: ProblemDifficulty;
    likes: number;
    dislikes: number;
    isLiked: boolean | null;
    similarQuestions: string;
    exampleTestcases: string;
    contributors: unknown[];
    topicTags: TopicTag[];
    companyTagStats: unknown;
    codeSnippets: CodeSnippet[];
    stats: string;
    hints: string[];
    solution: OfficialSolution;
    status: unknown;
    sampleTestCase: string;
    metaData: string;
    judgerAvailable: boolean;
    judgeType: string;
    mysqlSchemas: unknown[];
    enableRunCode: boolean;
    enableTestMode: boolean;
    enableDebugger: boolean;
    envInfo: string;
    libraryUrl: string | null;
    adminUrl: string | null;
    challengeQuestion: ChallengeQuestion;
    /** null if not logged in */
    note: string | null;
}
