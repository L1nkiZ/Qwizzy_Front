export default defineNuxtRouteMiddleware(() => {
	const userCookie = useCookie("user-cookie");

	// Si le cookie n'existe pas ou n'a pas de valeur, rediriger vers /connexion
	if (!userCookie.value) {
		return navigateTo("/connexion");
	}
});
