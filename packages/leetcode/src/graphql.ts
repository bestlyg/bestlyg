import best from '@bestlyg/cli';

import { resolve, PATH_GRAPHQL } from './utils';

const fs = best.zx.fs;

export const GRAPHQL_CONTEST = fs.readFileSync(resolve(PATH_GRAPHQL, 'contest.graphql'), 'utf8');
export const GRAPHQL_DAILY = fs.readFileSync(resolve(PATH_GRAPHQL, 'daily.graphql'), 'utf8');
export const GRAPHQL_PROBLEM = fs.readFileSync(resolve(PATH_GRAPHQL, 'problem.graphql'), 'utf8');
export const GRAPHQL_PROBLEMS = fs.readFileSync(resolve(PATH_GRAPHQL, 'problems.graphql'), 'utf8');
export const GRAPHQL_PROFILE = fs.readFileSync(resolve(PATH_GRAPHQL, 'profile.graphql'), 'utf8');
export const GRAPHQL_RECENT = fs.readFileSync(
    resolve(PATH_GRAPHQL, 'recent-submissions.graphql'),
    'utf8'
);
export const GRAPHQL_SUBMISSIONS = fs.readFileSync(
    resolve(PATH_GRAPHQL, 'submissions.graphql'),
    'utf8'
);
export const GRAPHQL_WHOAMI = fs.readFileSync(resolve(PATH_GRAPHQL, 'whoami.graphql'), 'utf8');
