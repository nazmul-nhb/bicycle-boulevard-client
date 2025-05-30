import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-console": ["error", { "allow": ["info", "warn", "error"] }],
      // "@typescript-eslint/no-console": ["warn", { "allow": ["info", "warn", "error"] }],
      "no-unused-vars": ["error", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": false
      }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": false
        }
      ]
    },
  },
  {
    files: ['src/utils/**/*.ts*', 'src/lib/**/*.ts*', 'src/types/**/*.ts*'],
    rules: { "@typescript-eslint/no-unused-vars": "off" }
  },
  {
    files: ['src/utils/**/*.ts*', 'src/lib/**/*.ts*', 'src/types/**/*.ts*'],
    rules: { "no-unused-vars": "off" }
  },
  {
    files: ['src/utils/**/*.ts*', 'src/lib/**/*.ts*'],
    rules: { "@typescript-eslint/no-explicit-any": "off" }
  },
  {
    files: ["src/**/*.types.ts", "src/**/*.interfaces.ts", "src/**/types/*.ts"],
    rules: { "@typescript-eslint/no-empty-object-type": "off", }
  }
)
