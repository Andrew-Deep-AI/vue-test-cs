import standard from '@vue/eslint-config-standard-with-typescript';
import vue from 'eslint-plugin-vue';
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
	vue.configs['flat/recommended'],
	vueTsConfigs.recommended,
	standard,
	{
		name: 'vitest-files',
		files: ['**/*.vi.test.ts'],
	},
	{
		rules: {
			'@stylistic/semi': 'off',
			'@stylistic/no-tabs': 'off',
			'@stylistic/comma-dangle': 'off',
			'@stylistic/indent': 'off',
			'@stylistic/quotes': 'off',
			'@stylistic/space-before-function-paren': 'off',
		},
	},
	{
		name: 'files-to-ignore',
		ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
	},
	skipFormatting,
);
