import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Base recommended config
  ...tseslint.configs.recommended,

  // Prettier integration (must be last to override other formatting rules)
  eslintPluginPrettier,

  // Custom configuration
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Catch dead code, allow _prefix for intentionally unused
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Encourage proper typing, but don't block development
      '@typescript-eslint/no-explicit-any': 'warn',
      // Let TypeScript infer return types for cleaner code
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Same as above, avoid verbose type annotations
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Prefer optional chaining over non-null assertions
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Allow error/warn/info, warn on log/debug (remove before production)
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      // Never ship debugger statements
      'no-debugger': 'error',
      // Keep imports organized and deduplicated
      'no-duplicate-imports': 'error',
      // Catch forgotten function calls or assignments
      'no-unused-expressions': 'error',
      // Immutability by default, use let only when needed
      'prefer-const': 'error',
      // Prevent type coercion bugs (== vs ===)
      eqeqeq: ['error', 'always'],
      // Always use braces to prevent scope bugs
      curly: ['error', 'all'],
      // Use function declarations, not arrow functions for named functions
      'func-style': ['error', 'declaration'],
      // Use arrow functions only for callbacks
      'prefer-arrow-callback': 'error',
    },
  },

  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**', '*.js', '*.mjs'],
  }
);
