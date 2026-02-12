export default defineNuxtRouteMiddleware(() => {
	const tokenCookie = useCookie("tokenCookie");

	// Si le cookie n'existe pas ou n'a pas de valeur, rediriger vers /connexion
	if (!tokenCookie.value) {
		return navigateTo("/admin/connexion");
	}
});
