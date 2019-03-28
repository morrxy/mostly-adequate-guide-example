module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'warn',
    complexity: ['error', 6]
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  globals: {
    window: true
  }
};
