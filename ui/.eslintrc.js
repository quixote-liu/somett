module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
    ],
    rules: {
        'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }], // 不能有声明后未被使用的变量或参数
        'no-redeclare': 1, // 禁止重复声明变量
        indent: [1, 4], // 缩进风格
        'react/jsx-indent': [1, 4], // 缩进风格
        'react/jsx-indent-props': [1, 4], // 缩进风格
        'react/no-deprecated': 1, // 是否检查过时方法
        'react/jsx-filename-extension': 0, // extension '.tsx'
        'react/no-unused-state': 0, // state 初始化赋值
        'react/destructuring-assignment': [0, 'always'], // //关闭使用解构赋值的检测
        'react/no-array-index-key': 0, // 允许使用 index 作为 key
        'react/jsx-props-no-spreading': 0,
        'max-len': 0, // 一行允许的最大长度 100 个字符
        'linebreak-style': [0, 'windows'], // 换行风格
        'lines-between-class-members': 0, // protected readonly 变量间换行
        'import/no-extraneous-dependencies': 0, // import 依赖是否本地需要列出
        'import/prefer-default-export': 0, // 有 @injectable() 的 export class 会有警告
        'import/extensions': 0, // import 自定义的 tsx 文件会有警告
        'import/no-mutable-exports': 0, // 支持一个文件多个export
        'import/no-unresolved': 0, // import 自定义的 tsx 文件会有警告
        'object-curly-newline': 0, // render 中的对象换行
        'max-classes-per-file': 0, // 一个文件允许多个 class 类
        'class-methods-use-this': 0, // 关闭 class 的方法里面 必须调用this
        'no-plusplus': 0, // 允许使用++
        'no-template-curly-in-string': 0,
        'react/sort-comp': 0, // 关闭对象内部方法名必须根据字典排序
        'prefer-destructuring': ['error', { array: false }], // 数组关闭解构
        'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
        'no-mixed-operators': 0, // 允许嵌套三元表达式
    },
};
