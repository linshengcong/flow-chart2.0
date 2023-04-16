module.exports = {
  extends: ['stylelint-config-standard'],
  processors: [],
  plugins: [
    "stylelint-order",
    "stylelint-scss"
  ],
  rules: {
    // 禁止空块
    'block-no-empty': true,
    // 指定 16 进制颜色为大写
    'color-hex-case': 'upper',
    // 指定 16 进制颜色为扩写
    'color-hex-length': 'long',
    // 要求或禁止规则前的空行
    'rule-empty-line-before': null,
    // 禁止空注释
    'comment-no-empty': true,
    // 要求在注释前有空白
    'comment-whitespace-inside': 'always',
    // 禁止使用未知规则
    'at-rule-no-unknown':[ true, {
      // 白名单
      'ignoreAtRules': ['mixin', 'include','for','v-deep','deep','extend']
    }],
    // 禁止使用未知规则
    "selector-pseudo-class-no-unknown": [ true, {
      'ignorePseudoClasses': ["v-deep",'deep','extend'],
    }],
    // 禁止未知的伪元素选择器
    "selector-pseudo-element-no-unknown": [true, {
      // 白名单
      "ignorePseudoElements": ["v-deep",'deep','extend']
    }],
    "no-descending-specificity": null
  }
}
