module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // project: 'tsconfig.json',
        // tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
        browser: true,
        webextensions: true,
    },
    globals: {
        module: true,
        exports: true,
        require: true,
        window: true,
        process: true,
        arguments: true,
        global: true,
        globalThis: true,
        __dirname: true,
        __filename: true,
        import: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // 不要用var
        'no-var': 'off',
        // 不要用any
        '@typescript-eslint/no-explicit-any': 'off',
        // 不要用require
        '@typescript-eslint/no-require-imports': 'off',
        // 不允许使用Function类型
        '@typescript-eslint/no-unsafe-function-type': 'off',
        // 必须要引入React
        'react/react-in-jsx-scope': 'off',
        // 不允许继承any
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        // 不允许短路调用
        '@typescript-eslint/no-unused-expressions': 'off',
        // 不允许用this当作变量
        '@typescript-eslint/no-this-alias': 'off',
        // 不允许空继承
        '@typescript-eslint/no-empty-object-type': 'off',
        // 不允许未使用的变量
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        'react/prop-types': ['error', { ignore: ['children'] }],
        // undef 的变量定义
        'no-undef': 'off',
    },
};
