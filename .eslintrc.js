module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 2020,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
    parser: 'vue-eslint-parser',
    plugins: [],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'comma-spacing': ['error', { before: false, after: true }],
    },
};
