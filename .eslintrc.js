module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    amd: true
  },
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/react',
    'plugin:@shopify/prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    'comma-dangle': ['warn', 'never'],
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    // 'prefer-const': 'warn',
    'prefer-const': 'off',
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: false
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx,js,jsx}']
    },
    {
      files: ['src/components/**/*.stories.tsx'],
      rules: {
        'react/prefer-stateless-function': 'off',
        '@shopify/jsx-no-hardcoded-content': 'off',
        '@shopify/react-initialize-state': 'off',
        'import/no-default-export': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off'
      }
    },
    {
      files: ['src/components/Icon/icons/*.ts'],
      rules: {
        '@shopify/images-no-direct-imports': 'off'
      }
    },
    {
      files: ['src/components/Color/Color.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off'
      }
    }
  ],
  ignorePatterns: [
    'node_modules',
    'build',
    '**/*.scss',
    'types',
    'yarn.lock',
    'config',
    'src/components/Icon/icons',
    'src/components/Icon/raw'
  ]
};
