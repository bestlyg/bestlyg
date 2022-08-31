module.exports = {
  extends: ['taro/react', 'plugin:prettier/recommended'],
  rules: {
    'import/no-commonjs': 0,
    'prettier/prettier': 'error',
    'jsx-quotes': 0,
    'no-shadow': 0, // 禁止重复名称
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-shadow': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
  },
};
