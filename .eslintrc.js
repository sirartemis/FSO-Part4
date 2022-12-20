module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true,
        'jest': true
    },
    'extends': 'eslint:recommended',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-console': 0,
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'object-curly-spacing': [
            'error', 'always'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error'
    }
}
