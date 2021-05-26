module.exports = {
  parser: 'babel-eslint',
  root: true,
  extends: ['eslint-config-standard', 'prettier'],
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 'off', // import order cannot be determined correctly in .svelte components
        'import/no-mutable-exports': 'off', // to dismiss `export let prop = 'default'` warning
        'no-labels': 'off',
        'no-restricted-syntax': [
          'error',
          'ForInStatement',
          'ForOfStatement',
          'WithStatement'
        ] // remove LabeledStatement from the list
      }
    }
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
}
