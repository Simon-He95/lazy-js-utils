const simon = require('@simon_he/eslint-config').default

module.exports = simon({
  rules: {
    'no-console': 'off',
    'ts/ban-types': 'off',
  },
})
