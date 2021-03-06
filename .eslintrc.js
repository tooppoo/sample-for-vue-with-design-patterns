module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'no-undef': 'off', // avoid the error on "components" key in vue-class-component decorator
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
