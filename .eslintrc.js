module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    // ECMAScript modules 模式
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended', 'prettier'],
  globals: {
    wx: true,
    App: true,
    Page: true,
    Component: true,
    getApp: true,
    getCurrentPages: true,
    Behavior: true,
    global: true,
    __wxConfig: true,
  },
  ignorePatterns: ['*.wxs'],
  rules: {
    'prettier/prettier': 'warn',
    'no-undef': 'off',
    camelcase: ['error', { ignoreDestructuring: true }],
    'class-name-casing': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-empty-interface': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'no-useless-constructor': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          array: false,
          object: false,
        },
        VariableDeclarator: {
          array: false,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-const-assign': 'error',
    'no-new-object': 'error',
    'no-prototype-builtins': 'error',
    'no-array-constructor': 'error',
    'array-callback-return': 'warn',
    'prefer-template': 'error',
    'no-useless-escape': 'error',
    'wrap-iife': ['error', 'outside'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-param-reassign': [
      'warn',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
          'state', // for Vuex
        ],
      },
    ],
    'no-confusing-arrow': 'warn',
    'no-dupe-class-members': 'error',
    'no-iterator': 'warn',
    'dot-notation': 'warn',
    'one-var': ['warn', 'never'],
    'no-multi-assign': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_.+',
        varsIgnorePattern: '^_.+',
      },
    ],
    eqeqeq: ['warn', 'always'],
    'no-case-declarations': 'error',
    'no-nested-ternary': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-else-return': [
      'warn',
      {
        allowElseIf: false,
      },
    ],
    'no-new-wrappers': 'warn',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
      },
    ],
    'linebreak-style': ['warn', 'unix'],
  },
};
