import { z, type ZodType } from 'zod';

export const BESTLYG_E2E_TARGET_ENV_OVERRIDES = 'BESTLYG_E2E_TARGET_ENV_OVERRIDES';

type TargetEnvOverrides = Record<string, unknown>;

function isPlainRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertSafeKey(key: string) {
    if (!key || ['__proto__', 'prototype', 'constructor'].includes(key)) {
        throw new Error(`--env 包含非法路径片段 "${key}"。`);
    }
}

function setNestedValue(target: TargetEnvOverrides, pathSegments: string[], value: string) {
    let cursor = target;

    pathSegments.forEach((segment, index) => {
        assertSafeKey(segment);

        if (index === pathSegments.length - 1) {
            if (isPlainRecord(cursor[segment])) {
                throw new Error(`--env "${pathSegments.join('.')}" 与已有对象路径冲突。`);
            }

            cursor[segment] = value;
            return;
        }

        const nextValue = cursor[segment];

        if (nextValue === undefined) {
            cursor[segment] = {};
        } else if (!isPlainRecord(nextValue)) {
            throw new Error(`--env "${pathSegments.join('.')}" 与已有值路径冲突。`);
        }

        cursor = cursor[segment] as TargetEnvOverrides;
    });
}

function mergePlainObjects(base: unknown, overrides: unknown): unknown {
    if (!isPlainRecord(base) || !isPlainRecord(overrides)) {
        return overrides;
    }

    const merged: TargetEnvOverrides = { ...base };

    Object.entries(overrides).forEach(([key, value]) => {
        assertSafeKey(key);
        merged[key] = mergePlainObjects(merged[key], value);
    });

    return merged;
}

function assertStringLeafObject(
    value: unknown,
    pathSegments: string[] = [],
): asserts value is TargetEnvOverrides {
    if (!isPlainRecord(value)) {
        throw new Error(`${BESTLYG_E2E_TARGET_ENV_OVERRIDES} 必须是 JSON 对象。`);
    }

    Object.entries(value).forEach(([key, childValue]) => {
        assertSafeKey(key);

        if (typeof childValue === 'string') {
            return;
        }

        if (isPlainRecord(childValue)) {
            assertStringLeafObject(childValue, [...pathSegments, key]);
            return;
        }

        const fullPath = [...pathSegments, key].join('.');
        throw new Error(
            `${BESTLYG_E2E_TARGET_ENV_OVERRIDES} 中 "${fullPath}" 的值必须是字符串或嵌套对象。`,
        );
    });
}

export function parseTargetEnvOverrideArgs(values: string[] = []) {
    const overrides: TargetEnvOverrides = {};

    values.forEach((entry) => {
        const separatorIndex = entry.indexOf('=');

        if (separatorIndex <= 0) {
            throw new Error(`--env 必须使用 key=value 格式，当前收到 "${entry}"。`);
        }

        const rawKey = entry.slice(0, separatorIndex).trim();
        const rawValue = entry.slice(separatorIndex + 1);
        const pathSegments = rawKey.split('.').map((segment) => segment.trim());

        if (pathSegments.some((segment) => !segment)) {
            throw new Error(`--env 路径不能为空，当前收到 "${entry}"。`);
        }

        setNestedValue(overrides, pathSegments, rawValue);
    });

    return overrides;
}

export function serializeTargetEnvOverrides(overrides: TargetEnvOverrides) {
    if (Object.keys(overrides).length === 0) {
        return undefined;
    }

    return JSON.stringify(overrides);
}

export function loadTargetEnvOverridesFromEnv(env: NodeJS.ProcessEnv = process.env) {
    const rawValue = env[BESTLYG_E2E_TARGET_ENV_OVERRIDES];

    if (!rawValue) {
        return undefined;
    }

    let parsed: unknown;

    try {
        parsed = JSON.parse(rawValue);
    } catch {
        throw new Error(`${BESTLYG_E2E_TARGET_ENV_OVERRIDES} 必须是合法 JSON 对象。`);
    }

    assertStringLeafObject(parsed);
    return parsed;
}

export function applyTargetEnvOverrides<T extends object>(
    baseConfig: object,
    overrides: TargetEnvOverrides | undefined,
    schema: ZodType<T>,
    context = '目标环境配置',
) {
    const mergedConfig = overrides ? mergePlainObjects(baseConfig, overrides) : baseConfig;
    const result = schema.safeParse(mergedConfig);

    if (result.success) {
        return result.data;
    }

    throw new Error(`${context} 校验失败：\n${z.prettifyError(result.error)}`);
}
