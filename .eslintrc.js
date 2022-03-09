module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [2,'never'],
    'quotes':  [2, 'single', { 'avoidEscape':true}],
    'indent': [2, 'tab'],
    'sort-imports':[1,{'ignoreCase': true}],
    'no-multiple-empty-lines':2,
    'no-multi-spaces':'error',
  } 
}