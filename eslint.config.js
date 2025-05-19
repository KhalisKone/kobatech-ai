module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off'
  },
  ignores: ['**/*']  // Ignore all files
};
