/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  ignoreFiles: ['**/node_modules/**/*.{css,scss}'],
  rules: {
    'color-named': ['never', { severity: 'warning' }],
    'color-no-hex': [true, { severity: 'warning' }],
    'declaration-no-important': [true, { severity: 'warning' }],
    'rule-empty-line-before': null
  }
};
