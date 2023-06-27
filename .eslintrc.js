module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['**/*.js'],
      parserOptions: {
        requireConfigFile: false,
      },
    },
  ],
  rules: {
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'off',
      },
    ],
  },
};
