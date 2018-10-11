module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    /*
     * Disable console.log in particular but allow other console methods.
     */
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
  },
};
