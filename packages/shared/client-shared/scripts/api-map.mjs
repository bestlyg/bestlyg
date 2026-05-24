import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import ts from 'typescript';

const packageRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const repoPackagesRoot = path.resolve(packageRoot, '..', '..');
const serverRoot = path.resolve(repoPackagesRoot, 'server');
const distPath = path.resolve(packageRoot, 'src', 'api-map.ts');
const globalPrefix = '/api';
const globalPrefixExcludes = new Set(['/static', '/zjuer/wiki']);
const allMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'search'];
const methodDecoratorMap = {
    Get: ['get'],
    Post: ['post'],
    Put: ['put'],
    Delete: ['delete'],
    Patch: ['patch'],
    Options: ['options'],
    Head: ['head'],
    All: allMethods,
};

const apiMap = createApiMap();

fs.writeFileSync(distPath, createApiMapSource(apiMap));

function createApiMap() {
    const { items, byName } = parseServerClasses();
    const res = {};

    for (const item of items) {
        if (item.controllerPath === undefined) continue;
        const routes = getRoutesWithInherited(byName, item);
        if (!routes.length) continue;
        if (!res[item.name]) res[item.name] = {};

        for (const route of routes) {
            const routePath = createRoutePath(item.controllerPath, route.path);
            for (const method of route.methods) {
                const methodName =
                    route.methods.length === 1
                        ? route.methodName
                        : `${route.methodName}${capitalize(method)}`;
                res[item.name][methodName] = {
                    method,
                    path: routePath,
                };
            }
        }
    }

    return res;
}

function parseServerClasses() {
    const items = [];
    const byName = new Map();
    const filePaths = [
        ...collectTypescriptFiles(path.resolve(serverRoot, 'src')),
        ...collectTypescriptFiles(path.resolve(serverRoot, 'libs')),
    ];

    for (const filePath of filePaths) {
        const sourceFile = ts.createSourceFile(
            filePath,
            fs.readFileSync(filePath, 'utf8'),
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS,
        );

        visit(sourceFile, (node) => {
            if (!ts.isClassDeclaration(node) || !node.name) return;
            const name = node.name.text;
            const item = {
                id: `${filePath}:${name}`,
                name,
                controllerPath: getDecoratorPath(node, 'Controller'),
                extendsName: getExtendsName(node),
                routes: getRouteDecoratedMethods(node),
            };
            items.push(item);
            if (!byName.has(name)) byName.set(name, []);
            byName.get(name).push(item);
        });
    }

    return { items, byName };
}

function getRoutesWithInherited(classLookup, item, seen = new Set()) {
    if (!item || seen.has(item.id)) return [];
    seen.add(item.id);
    const routeMap = new Map();
    const parent = classLookup.get(item.extendsName)?.[0];

    for (const route of getRoutesWithInherited(classLookup, parent, seen)) {
        routeMap.set(route.methodName, route);
    }
    for (const route of item.routes) {
        routeMap.set(route.methodName, route);
    }

    return [...routeMap.values()];
}

function getRouteDecoratedMethods(node) {
    const routes = [];
    for (const member of node.members) {
        if (!ts.isMethodDeclaration(member)) continue;
        const methodName = getMemberName(member.name);
        if (!methodName) continue;
        for (const [decoratorName, methods] of Object.entries(methodDecoratorMap)) {
            const pathValue = getDecoratorPath(member, decoratorName);
            if (pathValue === undefined) continue;
            routes.push({
                methodName,
                methods,
                path: pathValue,
            });
            break;
        }
    }
    return routes;
}

function getDecoratorPath(node, name) {
    const decorator = getDecorators(node).find((decorator) => getDecoratorName(decorator) === name);
    if (!decorator) return undefined;
    const expression = decorator.expression;
    if (!ts.isCallExpression(expression)) return '';
    return getStringArgument(expression.arguments[0]) ?? '';
}

function getDecorators(node) {
    return ts.canHaveDecorators(node) ? ts.getDecorators(node) ?? [] : [];
}

function getDecoratorName(decorator) {
    const expression = decorator.expression;
    if (ts.isIdentifier(expression)) return expression.text;
    if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
        return expression.expression.text;
    }
    return undefined;
}

function getStringArgument(argument) {
    if (!argument) return '';
    if (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument)) {
        return argument.text;
    }
    return undefined;
}

function getMemberName(name) {
    if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
        return name.text;
    }
    return undefined;
}

function getExtendsName(node) {
    const heritage = node.heritageClauses?.find(
        (item) => item.token === ts.SyntaxKind.ExtendsKeyword,
    );
    const expression = heritage?.types[0]?.expression;
    if (!expression) return undefined;
    if (ts.isIdentifier(expression)) return expression.text;
    return expression.getText();
}

function createRoutePath(controllerPath, methodPath) {
    const rawPath = joinPaths(controllerPath, methodPath);
    const prefixedPath = globalPrefixExcludes.has(rawPath)
        ? rawPath
        : joinPaths(globalPrefix, rawPath);
    return toApiPath(prefixedPath);
}

function joinPaths(...parts) {
    const cleaned = parts
        .map((part) => String(part ?? '').trim())
        .filter(Boolean)
        .map((part) => part.replace(/^\/+|\/+$/g, ''))
        .filter(Boolean);
    return cleaned.length ? `/${cleaned.join('/')}` : '/';
}

function toApiPath(pathValue) {
    return pathValue.replace(/:([A-Za-z0-9_]+)/g, '{$1}');
}

function collectTypescriptFiles(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    const res = [];
    for (const item of fs.readdirSync(dirPath, { withFileTypes: true })) {
        const itemPath = path.resolve(dirPath, item.name);
        if (item.isDirectory()) {
            if (['dist', 'node_modules'].includes(item.name)) continue;
            res.push(...collectTypescriptFiles(itemPath));
            continue;
        }
        if (item.isFile() && item.name.endsWith('.ts') && !item.name.endsWith('.d.ts')) {
            res.push(itemPath);
        }
    }
    return res.sort();
}

function visit(node, visitor) {
    visitor(node);
    node.forEachChild((child) => visit(child, visitor));
}

function createApiMapSource(map) {
    return `
export type ApiEndpoint = Readonly<{
    method: string;
    path: string;
}>;

export type ApiPathParams = Record<string, string | number | boolean | null | undefined>;

export const apiMap = ${toTsLiteral(map)} as const;

export type ApiMap = typeof apiMap;

export function resolveApiPath(endpoint: ApiEndpoint, params: ApiPathParams = {}) {
    return endpoint.path.replace(/\\{([^}]+)\\}/g, (_matched, key: string) => {
        if (!Object.prototype.hasOwnProperty.call(params, key) || params[key] == null) {
            throw new Error(\`Missing api path param: \${key}\`);
        }
        return encodeURIComponent(String(params[key]));
    });
}
`.trimStart();
}

function toTsLiteral(value, level = 0) {
    if (Array.isArray(value)) {
        if (!value.length) return '[]';
        const items = value.map((item) => `${indent(level + 1)}${toTsLiteral(item, level + 1)},`);
        return `[\n${items.join('\n')}\n${indent(level)}]`;
    }

    if (value && typeof value === 'object') {
        const entries = Object.entries(value);
        if (!entries.length) return '{}';
        const items = entries.map(
            ([key, item]) =>
                `${indent(level + 1)}${formatKey(key)}: ${toTsLiteral(item, level + 1)},`,
        );
        return `{\n${items.join('\n')}\n${indent(level)}}`;
    }

    if (typeof value === 'string') return quoteString(value);
    return JSON.stringify(value);
}

function formatKey(key) {
    return /^[A-Za-z_$][\w$]*$/.test(key) ? key : quoteString(key);
}

function quoteString(value) {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function indent(level) {
    return '    '.repeat(level);
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
