// @ts-check
import eslint from '@antfu/eslint-config'

export default eslint(
  {
    test: false,
    ignores: [
      'tsconfig.json',
      'eslint.config.js',
      'src/global.d.ts',
      'README.md',
      'package.json',
      'tsconfig-esm.json',
      'pnpm-workspace.yaml',
      'test/*',
      'src/renderer/config.ts'
    ],
  },{
    rules: {
      'jsonc/indent': ['error', 2],
      'ts/indent': ['error', 2],
      'ts/semi': ['error', 'always'],
      'style/semi': ['error', 'always'],
      'style/comma-spacing': ['error', { before: false, after: true }],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'dot-notation': 'off',
    }
  }
)