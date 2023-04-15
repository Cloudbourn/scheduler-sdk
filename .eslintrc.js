module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'import/no-cycle': [2, { maxDepth: 2 }],
  },
}
