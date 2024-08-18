import { LeetCodeGraphQLQuery } from './types';
import { BASE_URL_CN as BASE, parseCookie, USER_AGENT } from './utils';
import { GRAPHQL_GET_PROBLEM, GRAPHQL_GET_USER_PROFILE, Problem, UserResult } from './graphql';

// document.cookie
//     .split('; ')
//     .map(v => v.split('='))
//     .reduce((o, [k, v]) => {
//         o[k] = v;
//         return o;
//     }, {});

export interface LeetCodeOptions {
    credential?: {
        csrf?: string;
        session?: string;
    };
}

const defaultLeetCodeOptions: Partial<LeetCodeOptions> = { credential: {} };

export class LeetCode {
    constructor(public options: LeetCodeOptions) {
        options = { ...defaultLeetCodeOptions, ...options };
    }
    async fetch(query: LeetCodeGraphQLQuery, endpoint: string) {
        const { csrf = '', session = '' } = this.options.credential;
        const res = await fetch(`${BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                origin: BASE,
                referer: BASE,
                cookie: `csrftoken=${csrf}; LEETCODE_SESSION=${session};`,
                'x-csrftoken': csrf,
                'user-agent': USER_AGENT,
                ...query.headers,
            },
            body: JSON.stringify(query),
        });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}: ${await res.text()}`);
        }
        if (res.headers.has('set-cookie')) {
            const cookies = parseCookie(res.headers.get('set-cookie') ?? '');
            if (cookies['csrftoken']) {
                this.options.credential.csrf = cookies['csrftoken'];
            }
        }
        const data = await res.text();
        try {
            return JSON.parse(data);
        } catch (_err) {
            console.log('JSON parse fail', data);
            return null;
        }
    }

    async graphql(query: LeetCodeGraphQLQuery) {
        return this.fetch(query, '/graphql');
    }

    /**
     * Get information of a problem by its slug.
     * @param slug Problem slug
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCode();
     * const problem = await leetcode.problem("two-sum");
     * ```
     */
    // public async problem(slug: string): Promise<Problem> {
    //     const { data } = await this.graphql({
    //         variables: { titleSlug: slug.toLowerCase().replace(/\s/g, '-') },
    //         query: GRAPHQL_PROBLEM,
    //     });
    //     return data.question as Problem;
    // }

    /**
     * Get public profile of a user.
     * @param username
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCodeCN();
     * const profile = await leetcode.user("jacoblincool");
     * ```
     */
    public async getUserProfile(username: string): Promise<UserResult> {
        const { data } = await this.graphql({
            operationName: 'getUserProfile',
            variables: { username },
            query: GRAPHQL_GET_USER_PROFILE,
        });
        return data;
    }

    /**
     * Get information of a problem by its slug.
     * @param slug Problem slug
     * @returns
     *
     * ```javascript
     * const leetcode = new LeetCode();
     * const problem = await leetcode.problem("two-sum");
     * ```
     */
    public async getProblem(slug: string): Promise<Problem> {
        const { data } = await this.graphql({
            variables: { titleSlug: slug.toLowerCase().replace(/\s/g, '-') },
            query: GRAPHQL_GET_PROBLEM,
        });

        return data.question as Problem;
    }
}
