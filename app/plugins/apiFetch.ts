export default defineNuxtPlugin(() => {
	// const { session } = useUserSession();
	const {
		public: { baseApiURL, nginx, docker },
	} = useRuntimeConfig();

	// Determine the base URL for API requests (check if running on server or client + if there is nginx proxy)
	const baseUrl: string = docker
		? "http://api:8000/api/"
		: nginx
			? "/api/"
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
