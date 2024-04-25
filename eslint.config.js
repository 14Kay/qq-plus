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
      'pnpm-workspace.yaml',
      'test/*'
    ],
  },{
    rules: {
      'jsonc/indent': ['error', 2],
      'ts/indent': ['error', 2],
      'ts/semi': ['error', 'always'],
      'style/semi': ['error', 'always']
    }
  }
)