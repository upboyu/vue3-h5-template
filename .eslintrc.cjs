/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['src/components/**/index.vue'], // 指定 index.vue 文件
      rules: {
        'vue/multi-word-component-names': 'off', // 关闭该规则
      },
    },
  ],
}
