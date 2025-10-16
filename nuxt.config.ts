// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		rootAttrs: {
			class: "min-h-dvh flex flex-col",
		},
	},
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: [
		"@nuxt/eslint",
		"@nuxt/test-utils/module",
		"@nuxt/ui",
		"@pinia/nuxt",
		"@compodium/nuxt",
	],
	icon: { localApiEndpoint: "/nuxt/api" },
	runtimeConfig: {
		public: {
			baseApiURL: process.env.BASE_API_URL ?? "http://localhost:8080/api/v1",
			nginx: !!process.env.NGINX,
		},
	},
	css: ["~/assets/css/main.css"],
});
