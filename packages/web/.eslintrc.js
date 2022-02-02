module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'next',
    '../../.eslintrc.js',
    'next/core-web-vitals',
  ],
  settings: {
    react: {
      version: 'latest',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-document-import-in-page': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/display-name': 'off',
  },
};
