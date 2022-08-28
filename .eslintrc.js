module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 2020,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb', 'eslint:recommended'],
    parser: 'vue-eslint-parser',
    plugins: [],
    rules: {
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'comma-spacing': ['error', { before: false, after: true }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: false,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'max-len': ['error', { code: 140 }],
    },
};
