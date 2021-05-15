module.exports = {
  // extends: 'stylelint-config-apostrophe'

  // Config for tailwind with standard =>
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  }
};
