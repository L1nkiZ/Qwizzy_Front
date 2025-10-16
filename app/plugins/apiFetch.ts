export default defineNuxtPlugin(() => {
	// const { session } = useUserSession();
	const {
		public: { baseApiURL, nginx },
	} = useRuntimeConfig();

	const baseUrl: string = import.meta.server
		? "http://api:3000/api/v1"
		: nginx
			? "/api/v1"
			: baseApiURL;

	const apiFetch = $fetch.create({
		baseURL: baseUrl,
	});

	// Expose to useNuxtApp().$apiFetch
	return {
		provide: {
			apiFetch,
		},
	};
});
