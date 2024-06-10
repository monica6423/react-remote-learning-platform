module.exports = {
  languageOptions: {
    ecmaVersion: 2021, // Specify ECMAScript version
    globals: {
      // Define global variables
      console: 'readonly',
      document: 'readonly',
      window: 'readonly',
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
  },
  ignores: ['node_modules/*', 'build/**/*', '.vercel/**/*', 'eslint.config.js'],
}
