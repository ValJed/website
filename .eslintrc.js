module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': 'off'
  }
}
