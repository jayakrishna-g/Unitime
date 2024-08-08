module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-base'],

  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
