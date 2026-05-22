export interface BestlygE2EEnv {
    BESTLYG_E2E_TARGET_ENV?: string;
    BESTLYG_E2E_STORAGE_STATE?: string;
    BESTLYG_E2E_WEB_SERVER_COMMAND?: string;
    BESTLYG_E2E_WEB_SERVER_URL?: string;
    CI?: string;
}

export function loadBestlygEnv(env: NodeJS.ProcessEnv = process.env): BestlygE2EEnv {
    return {
        BESTLYG_E2E_TARGET_ENV: env.BESTLYG_E2E_TARGET_ENV,
        BESTLYG_E2E_STORAGE_STATE: env.BESTLYG_E2E_STORAGE_STATE,
        BESTLYG_E2E_WEB_SERVER_COMMAND: env.BESTLYG_E2E_WEB_SERVER_COMMAND,
        BESTLYG_E2E_WEB_SERVER_URL: env.BESTLYG_E2E_WEB_SERVER_URL,
        CI: env.CI,
    };
}
