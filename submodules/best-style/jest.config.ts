import type { JestConfigWithTsJest } from 'ts-jest';
import { getLibs, getAbsolutePath, resolve } from './scripts/utils';

export default async (): Promise<JestConfigWithTsJest> => {
    return {
        verbose: true,
        preset: 'ts-jest',
        testEnvironment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
        moduleFileExtensions: ['ts', 'tsx', 'js'],
        testPathIgnorePatterns: ['/node_modules/'],
        testRegex: '.*\\.test\\.(j|t)sx?$',
        collectCoverageFrom: [
            'components/**/*.{ts,tsx}',
            '!components/*/style/index.tsx',
            '!components/*/__test__/**',
            '!components/*/__demo__/**',
            '!components/**/*/interface.{ts,tsx}'
        ],
        moduleNameMapper: {
            '/\\.(css|less)$/': 'identity-obj-proxy',
            '^react$': getAbsolutePath('react'),
            '^react-dom$': getAbsolutePath('react-dom'),
            ...getLibs().reduce((o, { packageJson: { name }, dirPath }) => {
                o[`^${name}$`] = resolve(dirPath, 'src');
                return o;
            }, {})
        },
        // testEnvironmentOptions: {
        //     url: 'http://localhost'
        // },
        transform: {
            '\\.tsx?$': './tests/code-transformer.js',
            '\\.jsx?$': './tests/code-transformer.js',
            '\\.css$': './tests/style-transformer.js',
            '\\.less$': './tests/style-transformer.js'
        }
    };
};
