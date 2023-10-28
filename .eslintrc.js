module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
      rules: {
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        'import/no-cycle': [2, { maxDepth: 2 }],
      },
    },
  ],
}
