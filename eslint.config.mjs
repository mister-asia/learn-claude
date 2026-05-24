import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    ...nextConfig,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            'simple-import-sort': simpleImportSort,
            prettier: prettierPlugin,
            unicorn,
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^next', '^[a-z]'],
                        ['^@/views'],
                        ['^@/widgets'],
                        ['^@/features'],
                        ['^@/entities'],
                        ['^@/shared'],
                        ['^@/'],
                        ['^\\.'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                    ignore: ['^index\\.tsx?$', '^next-env\\.d\\.ts$'],
                },
            ],
        },
    },
    // FSD: shared cannot import from any FSD layer
    {
        files: ['src/shared/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@/views/*', '@/widgets/*', '@/features/*', '@/entities/*'],
                            message: 'shared layer cannot import from other FSD layers',
                        },
                    ],
                },
            ],
        },
    },
    // FSD: entities can only import from shared
    {
        files: ['src/entities/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@/views/*', '@/widgets/*', '@/features/*'],
                            message:
                                'entities layer cannot import from views, widgets, or features',
                        },
                    ],
                },
            ],
        },
    },
    // FSD: features can only import from entities and shared
    {
        files: ['src/features/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@/views/*', '@/widgets/*'],
                            message: 'features layer cannot import from views or widgets',
                        },
                    ],
                },
            ],
        },
    },
    // FSD: widgets cannot import from views
    {
        files: ['src/widgets/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@/views/*'],
                            message: 'widgets layer cannot import from views',
                        },
                    ],
                },
            ],
        },
    },
    {
        ignores: ['.next/', 'node_modules/', 'coverage/'],
    },
];
