export const apiMap = {
    "AppController": {
        "sse": {
            "method": "post",
            "path": "/api/sse"
        }
    },
    "ServerlessCodeController": {
        "getServerlessCode": {
            "method": "get",
            "path": "/api/data/serverless-code"
        },
        "createServerlessCode": {
            "method": "post",
            "path": "/api/data/serverless-code"
        },
        "updateServerlessCode": {
            "method": "patch",
            "path": "/api/data/serverless-code"
        },
        "deleteServerlessCode": {
            "method": "delete",
            "path": "/api/data/serverless-code"
        }
    },
    "ServerlessController": {
        "getServerless": {
            "method": "get",
            "path": "/api/data/serverless"
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
    "LedgerController": {
        "getLedgerPage": {
            "method": "get",
            "path": "/api/data/ledger/page"
        },
        "getLedgerList": {
            "method": "get",
            "path": "/api/data/ledger/list"
        },
        "getLedgerSummary": {
            "method": "get",
            "path": "/api/data/ledger/summary"
        }
    },
    "LeetcodeController": {
        "getLeetcodeProblemList": {
            "method": "get",
            "path": "/api/data/leetcode/problem/list"
        },
        "getLeetcodeProblems": {
            "method": "get",
            "path": "/api/data/leetcode/problem"
        }
    },
    "UserController": {
        "getUserList": {
            "method": "get",
            "path": "/api/data/user/list"
        }
    },
    "XuanController": {
        "getXuanList": {
            "method": "get",
            "path": "/api/data/xuan"
        }
    },
    "SecretsController": {
        "getSecrets": {
            "method": "get",
            "path": "/api/data/secrets"
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
    "ApiController": {
        "health": {
            "method": "get",
            "path": "/api/health"
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
    }
} as const;