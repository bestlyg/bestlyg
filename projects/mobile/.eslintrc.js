module.exports = {
  extends: ['taro/react', 'plugin:prettier/recommended'],
  rules: {
    'import/no-commonjs': 0,
    'prettier/prettier': 'error',
    'jsx-quotes': 0,
    'no-shadow': 0, // 禁止重复名称
    '@typescript-eslint/no-unused-expressions': 0,
  },
};
