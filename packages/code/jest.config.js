module.exports = {
    preset: 'ts-jest',
    // testMatch: ['<rootDir>/packages/**/__tests__/**/*.(test|spec).[jt]s?(x)'],
    testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
    moduleNameMapper: {
        // '^@bestlyg/(.*?)$': '<rootDir>/packages/$1/src',
        '^@/(.*?)$': '<rootDir>/src/$1',
    },
    cacheDirectory: './jest/cacheDirectory',
    coverageDirectory: './jest/coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: [
        // 'packages/*/src/**/*.ts',
        // 'packages/data-structures/src/**/*.ts',
        // 'packages/algorithms/src/**/*.ts',
        './src/**/*.ts',
    ],
    collectCoverage: true,
    // testEnvironment: 'jsdom',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
