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
		files: ["app/components/**/*.vue", "app/pages/**/*.vue"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/no-index": "error",
		},
	},
	eslintConfigPrettier,
);
