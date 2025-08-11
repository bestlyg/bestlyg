export const apiMap = {
    "AppController": {
        "sse": {
            "method": "post",
            "path": "/api/sse"
        }
    },
    "CasbinRuleController": {
        "findList": {
            "method": "get",
            "path": "/api/database/casbin-rule/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/casbin-rule/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/casbin-rule/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/casbin-rule/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/casbin-rule/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/casbin-rule"
        },
        "save": {
            "method": "post",
            "path": "/api/database/casbin-rule"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/casbin-rule"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/casbin-rule/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/casbin-rule/batch"
        }
    },
    "LedgerController": {
        "findList": {
            "method": "get",
            "path": "/api/database/ledger/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/ledger/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/ledger/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/ledger/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/ledger/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/ledger"
        },
        "save": {
            "method": "post",
            "path": "/api/database/ledger"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/ledger"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/ledger/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/ledger/batch"
        }
    },
    "LeetcodeProblemController": {
        "createWithSlug": {
            "method": "post",
            "path": "/api/database/leetcode-problem/slug/{id}"
        },
        "findList": {
            "method": "get",
            "path": "/api/database/leetcode-problem/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/leetcode-problem/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/leetcode-problem/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/leetcode-problem/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/leetcode-problem/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/leetcode-problem"
        },
        "save": {
            "method": "post",
            "path": "/api/database/leetcode-problem"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/leetcode-problem"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/leetcode-problem/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/leetcode-problem/batch"
        }
    },
    "LeetcodeSolutionController": {
        "findList": {
            "method": "get",
            "path": "/api/database/leetcode-solution/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/leetcode-solution/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/leetcode-solution/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/leetcode-solution/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/leetcode-solution/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/leetcode-solution"
        },
        "save": {
            "method": "post",
            "path": "/api/database/leetcode-solution"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/leetcode-solution"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/leetcode-solution/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/leetcode-solution/batch"
        }
    },
    "SecretsController": {
        "findList": {
            "method": "get",
            "path": "/api/database/secrets/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/secrets/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/secrets/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/secrets/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/secrets/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/secrets"
        },
        "save": {
            "method": "post",
            "path": "/api/database/secrets"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/secrets"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/secrets/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/secrets/batch"
        }
    },
    "ServerlessController": {
        "findList": {
            "method": "get",
            "path": "/api/database/serverless/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/serverless/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/serverless/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/serverless/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/serverless/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/serverless"
        },
        "save": {
            "method": "post",
            "path": "/api/database/serverless"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/serverless"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/serverless/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/serverless/batch"
        },
        "callGet": {
            "method": "get",
            "path": "/api/serverless/call"
        },
        "callPost": {
            "method": "post",
            "path": "/api/serverless/call"
        },
        "callPut": {
            "method": "put",
            "path": "/api/serverless/call"
        },
        "callDelete": {
            "method": "delete",
            "path": "/api/serverless/call"
        },
        "callPatch": {
            "method": "patch",
            "path": "/api/serverless/call"
        },
        "callOptions": {
            "method": "options",
            "path": "/api/serverless/call"
        },
        "callHead": {
            "method": "head",
            "path": "/api/serverless/call"
        },
        "callSearch": {
            "method": "search",
            "path": "/api/serverless/call"
        }
    },
    "UserController": {
        "findList": {
            "method": "get",
            "path": "/api/database/user/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/user/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/user/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/user/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/user/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/user"
        },
        "save": {
            "method": "post",
            "path": "/api/database/user"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/user"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/user/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/user/batch"
        }
    },
    "XuanController": {
        "findList": {
            "method": "get",
            "path": "/api/database/xuan/list"
        },
        "findPageAndCount": {
            "method": "get",
            "path": "/api/database/xuan/page"
        },
        "findOne": {
            "method": "get",
            "path": "/api/database/xuan/{id}"
        },
        "update": {
            "method": "patch",
            "path": "/api/database/xuan/{id}"
        },
        "delete": {
            "method": "delete",
            "path": "/api/database/xuan/{id}"
        },
        "find": {
            "method": "get",
            "path": "/api/database/xuan"
        },
        "save": {
            "method": "post",
            "path": "/api/database/xuan"
        },
        "updateBatch": {
            "method": "put",
            "path": "/api/database/xuan"
        },
        "saveBatch": {
            "method": "post",
            "path": "/api/database/xuan/batch"
        },
        "deleteBatch": {
            "method": "delete",
            "path": "/api/database/xuan/batch"
        }
    },
    "AuthController": {
        "signIn": {
            "method": "post",
            "path": "/api/auth/login"
        }
    },
    "StaticController": {
        "getStaticFile": {
            "method": "get",
            "path": "/static"
        }
    },
    "ClientController": {
        "getDocsSidebars": {
            "method": "get",
            "path": "/api/client/docs/sidebars"
        },
        "getLeetcodeSidebars": {
            "method": "get",
            "path": "/api/client/leetcode/sidebars"
        }
    },
    "ZjuerController": {
        "toWiki": {
            "method": "get",
            "path": "/zjuer/wiki"
        }
    }
} as const;