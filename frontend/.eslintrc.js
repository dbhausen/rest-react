module.exports = {
   env: {
      browser: true,
      es2021: true,
   },

   extends: ['plugin:react/recommended', 'airbnb', 'plugin:import/typescript', 'plugin:prettier/recommended'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint', 'prettier'],
   rules: {
      'react/jsx-filename-extension': 'off',
      'react/destructuring-assignment': 'off',
      'no-underscore-dangle': 'off',
      'import/extensions': [
         'error',
         'never',
         {
            css: 'always',
         },
      ],
      'no-use-before-define': 'off',
      'react/jsx-boolean-value': 'off',
      'react/jsx-props-no-spreading': 'off',
   },
}
