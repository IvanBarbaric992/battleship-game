import js from '@eslint/js';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import preferArrow from 'eslint-plugin-prefer-arrow';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/.vite/**',
      '**/node_modules/**',
      '**/pnpm-lock.yaml',
      '**/.env',
      '**/.vscode/**',
      '**/public/**',
      '**/vite-env.d.ts',
      '**/*.config.js',
    ],
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prefer-arrow': preferArrow,
      'better-tailwindcss': betterTailwind,
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.app.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'better-tailwindcss': {
        entryPoint: 'src/index.css',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksConditionals: true,
          checksVoidReturn: true,
          checksSpreads: true,
        },
      ],
      '@typescript-eslint/return-await': ['error', 'always'],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'error',
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: false,
          enforceDynamicLinks: 'always',
        },
      ],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-pascal-case': 'error',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          reservedFirst: true,
        },
      ],
      ...reactHooks.configs['recommended-latest'].rules,
      ...betterTailwind.configs['recommended-warn'].rules,
      'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks: '(useIsomorphicLayoutEffect|useUpdateEffect)',
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-spread': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'object-shorthand': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-script-url': 'error',
      'no-throw-literal': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'off',
      'no-return-await': 'off',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      yoda: 'error',

      // Import rules for better organization (2025 standards)
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node builtin modules
            'external', // npm packages
            'internal', // @/ imports
            'parent', // ../
            'sibling', // ./
            'index', // ./index
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'import/no-unused-modules': 'off', // Can be slow, enable if needed
      'import/no-deprecated': 'warn',
      'import/newline-after-import': 'error',
      'import/no-anonymous-default-export': 'warn',
    },
  },

  {
    files: ['**/vite.config.*', '**/vitest.config.*', '**/eslint.config.*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },

  {
    files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.vitest,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-arrow/prefer-arrow-functions': 'off',
    },
  },
);
