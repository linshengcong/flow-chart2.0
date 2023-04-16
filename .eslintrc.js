module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    // 在这里可以添加你想要使用的风格规范
    'eslint:recommended', // 官方推荐
    // "plugin:vue/base" // 基础配置
    // "plugin:vue/essential" // 基本配置
    // "plugin:vue/strongly-recommended" // 强力推荐
    'plugin:vue/recommended' // 主推，最严谨
  ],
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  // it is base on [https://eslint.org/docs/rules, https://github.com/vuejs/eslint-config-vue]
  rules: {
    // 在这里可以针对特定的规则进行覆盖或添加
    // ------js风格规范------
    'no-alert': 'error',
    // 禁止var声明变量
    'no-var': 'error',
    // 建议使用const
    'prefer-const': 'error',
    // 强制使用一致的缩进
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 强制使用一致的反勾号、双引号或单引号
    'quotes': ['error', 'single'],
    // 强制在 JSX 属性中使用一致的单引号或双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 禁止使用分号代替 ASI(除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    'semi': ['error', 'never'],
    // 禁止不必要的括号
    'no-extra-parens': 'error',
    // 禁止多余的 return 语句
    'no-useless-return': 'error',
    // 禁止Yoda条件
    'yoda': ['error', 'never'],
    // 要求 IIFE 使用括号括起来
    'wrap-iife': ['error', 'any'],
    // 要求遵循大括号约定
    'curly': ['error', 'multi-line'],
    // 强制在点号之前
    'dot-location': ['error', 'property'],
    // 要求使用 === 和 !==
    'eqeqeq': ['error', 'always'],
    // 禁止在 else 前有 return
    'no-else-return': 'error',
    // 禁止浮点小数
    'no-floating-decimal': 'error',
    // 禁止将变量初始化为 undefined
    'no-undef-init': 'error',
    // 要求使用骆驼拼写法
    // 'camelcase': ['error', { 'properties': 'always' }],
    // 块语句的最大可嵌套深度
    'max-depth': ['error', 4],
    // 禁止可以表达为更简单结构的三元操作符
    'no-unneeded-ternary': 'error',
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁止import和export和解构赋值时将引用重命名为相同的名字
    'no-useless-rename': 'error',
    // 在数组开括号后和闭括号前强制换行
    'array-bracket-newline': ['error', 'consistent'],
    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 'error',
    // 要求或禁止在注释前有空白
    'spaced-comment': ['error', 'always', {
      'block': { 'balanced': true }
    }],
    // 禁止多余的空格
    'no-multi-spaces': 'error',
    // 要求操作符周围有空格
    'space-infix-ops': 'error',
    // 强制在花括号中使用一致的空格
    'object-curly-spacing': ['error', 'always'],
    // 强制在逗号周围使用空格
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    // 禁止函数圆括号之前有一个空格
    'space-before-function-paren': ['error', 'never'],
    // 强制在代码块中开括号前和闭括号后有空格
    'block-spacing': ['error', 'always'],
    // 强制在关键字前后使用一致的空格
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    // 要求箭头函数的箭头之前或之后有空格
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    // 禁止使用拖尾逗号
    'comma-dangle': ['error', 'never'],
    // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-constant-condition': 'error',
    // 禁止使用debugger语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 函数参数禁止重名
    'no-dupe-args': 'error',
    // 禁止覆盖class命名
    'no-class-assign': 'error',
    // 模板字符串中使用${ 和 } 包含的表达式前后是否需要留空格，默认规则禁止花括号内有空格
    'template-curly-spacing': ['error', 'never'],
    // ------vue风格规范------
    'vue/no-unused-vars': 'error',
    // 禁止在标签的右括号之前使用换行符
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    // 自动闭合标签
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    // 强制每行的最大属性数
    'vue/max-attributes-per-line': ['error', {
      // 在一行中时
      'singleline': {
        'max': 3,
        'allowFirstLine': true
      },
      // 在多行中时
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }]
  }
}
