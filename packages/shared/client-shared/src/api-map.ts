export type ApiEndpoint = Readonly<{
    method: string;
    path: string;
}>;

export type ApiPathParams = Record<string, string | number | boolean | null | undefined>;

export const apiMap = {
    AppController: {
        sse: {
            method: 'post',
            path: '/api/sse',
        },
    },
    ClientController: {
        getDocsSidebars: {
            method: 'get',
            path: '/api/client/docs/sidebars',
        },
        getLeetcodeSidebars: {
            method: 'get',
            path: '/api/client/leetcode/sidebars',
        },
    },
    AuthController: {
        signIn: {
            method: 'post',
            path: '/api/auth/login',
        },
    },
    CasbinRuleController: {
        findList: {
            method: 'get',
            path: '/api/database/casbin-rule/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/casbin-rule/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/casbin-rule/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/casbin-rule',
        },
        save: {
            method: 'post',
            path: '/api/database/casbin-rule',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/casbin-rule/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/casbin-rule/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/casbin-rule',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/casbin-rule/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/casbin-rule/{id}',
        },
    },
    LedgerController: {
        findList: {
            method: 'get',
            path: '/api/database/ledger/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/ledger/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/ledger/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/ledger',
        },
        save: {
            method: 'post',
            path: '/api/database/ledger',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/ledger/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/ledger/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/ledger',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/ledger/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/ledger/{id}',
        },
    },
    LeetcodeProblemController: {
        findList: {
            method: 'get',
            path: '/api/database/leetcode-problem/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/leetcode-problem/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/leetcode-problem/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/leetcode-problem',
        },
        save: {
            method: 'post',
            path: '/api/database/leetcode-problem',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/leetcode-problem/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/leetcode-problem/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/leetcode-problem',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/leetcode-problem/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/leetcode-problem/{id}',
        },
        createWithSlug: {
            method: 'post',
            path: '/api/database/leetcode-problem/slug/{slug}',
        },
    },
    LeetcodeSolutionController: {
        findList: {
            method: 'get',
            path: '/api/database/leetcode-solution/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/leetcode-solution/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/leetcode-solution/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/leetcode-solution',
        },
        save: {
            method: 'post',
            path: '/api/database/leetcode-solution',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/leetcode-solution/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/leetcode-solution/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/leetcode-solution',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/leetcode-solution/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/leetcode-solution/{id}',
        },
    },
    SecretsController: {
        findList: {
            method: 'get',
            path: '/api/database/secrets/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/secrets/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/secrets/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/secrets',
        },
        save: {
            method: 'post',
            path: '/api/database/secrets',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/secrets/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/secrets/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/secrets',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/secrets/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/secrets/{id}',
        },
    },
    ServerlessController: {
        findList: {
            method: 'get',
            path: '/api/database/serverless/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/serverless/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/serverless/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/serverless',
        },
        save: {
            method: 'post',
            path: '/api/database/serverless',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/serverless/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/serverless/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/serverless',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/serverless/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/serverless/{id}',
        },
        callGet: {
            method: 'get',
            path: '/api/serverless/call',
        },
        callPost: {
            method: 'post',
            path: '/api/serverless/call',
        },
        callPut: {
            method: 'put',
            path: '/api/serverless/call',
        },
        callDelete: {
            method: 'delete',
            path: '/api/serverless/call',
        },
        callPatch: {
            method: 'patch',
            path: '/api/serverless/call',
        },
        callOptions: {
            method: 'options',
            path: '/api/serverless/call',
        },
        callHead: {
            method: 'head',
            path: '/api/serverless/call',
        },
        callSearch: {
            method: 'search',
            path: '/api/serverless/call',
        },
    },
    UserController: {
        findList: {
            method: 'get',
            path: '/api/database/user/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/user/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/user/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/user',
        },
        save: {
            method: 'post',
            path: '/api/database/user',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/user/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/user/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/user',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/user/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/user/{id}',
        },
    },
    XuanController: {
        findList: {
            method: 'get',
            path: '/api/database/xuan/list',
        },
        findPageAndCount: {
            method: 'get',
            path: '/api/database/xuan/page',
        },
        findOne: {
            method: 'get',
            path: '/api/database/xuan/{id}',
        },
        find: {
            method: 'get',
            path: '/api/database/xuan',
        },
        save: {
            method: 'post',
            path: '/api/database/xuan',
        },
        saveBatch: {
            method: 'post',
            path: '/api/database/xuan/batch',
        },
        update: {
            method: 'patch',
            path: '/api/database/xuan/{id}',
        },
        updateBatch: {
            method: 'put',
            path: '/api/database/xuan',
        },
        deleteBatch: {
            method: 'delete',
            path: '/api/database/xuan/batch',
        },
        delete: {
            method: 'delete',
            path: '/api/database/xuan/{id}',
        },
    },
    StaticController: {
        getStaticFile: {
            method: 'get',
            path: '/static',
        },
    },
    ZjuerController: {
        toWiki: {
            method: 'get',
            path: '/zjuer/wiki',
        },
    },
} as const;

export type ApiMap = typeof apiMap;

export function resolveApiPath(endpoint: ApiEndpoint, params: ApiPathParams = {}) {
    return endpoint.path.replace(/\{([^}]+)\}/g, (_matched, key: string) => {
        if (!Object.prototype.hasOwnProperty.call(params, key) || params[key] == null) {
            throw new Error(`Missing api path param: ${key}`);
        }
        return encodeURIComponent(String(params[key]));
    });
}
