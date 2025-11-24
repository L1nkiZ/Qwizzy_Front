import withNuxt from "./.nuxt/eslint.config.mjs";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default withNuxt(
	{
		rules: {
			"vue/block-order": [
				"error",
				{
					order: ["script", "template", "style"],
				},
			],
			"vue/block-lang": [
				"error",
				{
					script: {
						lang: "ts",
					},
				},
			],
			"vue/padding-line-between-blocks": "error",
			"vue/enforce-style-attribute": ["error", { allow: ["scoped", "module"] }],
			"vue/no-unused-refs": "error",
			"vue/no-unused-emit-declarations": "error",
			"vue/no-useless-mustaches": [
				"error",
				{
					ignoreIncludesComment: false,
					ignoreStringEscape: false,
				},
			],
			"vue/no-useless-v-bind": [
				"error",
				{
					ignoreIncludesComment: false,
					ignoreStringEscape: false,
				},
			],
			"vue/no-multiple-template-root": "off",
		},
	},
	{
		files: ["app/components/**/*.vue"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/filename-blocklist": [
				"error",
				{
					"**/index.vue": "*.vue",
					"**/Index.vue": "*.vue",
					"**/INDEX.vue": "*.vue",
				},
			],
			"check-file/folder-naming-convention": [
				"error",
				{
					"app/components/**/*": "PASCAL_CASE",
				},
			],
		},
	},
	{
		files: ["app/pages/**/*.*"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/folder-naming-convention": [
				"error",
				// tout sauf les dossiers spéciaux entre crochets comme [id] ou entre parenthèses comme (admin)
				{
					"app/pages/**/!(\\[*\\]|\\(*\\))/": "KEBAB_CASE",
				},
			],
		},
	},
	{
		files: ["app/services/**/*.*", "app/stores/**/*.*", "app/types/**/*.*"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/filename-naming-convention": [
				"error",
				{
					"app/services/**/*.!(test|spec).*": "*.service",
					"app/stores/**/*.!(test|spec).*": "*.store",
					"app/types/**/*.!(test|spec).*": "*.type",
				},
			],
		},
	},
	eslintConfigPrettier,
);
