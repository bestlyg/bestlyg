module.exports = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.(test|spec).[jt]s?(x)'],
  moduleNameMapper: {
    '^@bestlyg/(.*?)$': '<rootDir>/packages/$1/src',
  },
  cacheDirectory: './jest/cacheDirectory',
  coverageDirectory: './jest/coverage',
  collectCoverage: true,
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
