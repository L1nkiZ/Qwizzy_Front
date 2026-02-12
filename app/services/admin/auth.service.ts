/**
 * Connexion d'un user
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Promise contenant les données de l'utilisateur connecté et une éventuelle erreur
 */
export function login(email: string, password: string) {
	return useNuxtApp().$apiFetch<string>("/auth/login", {
		method: "POST",
		body: { email, password },
	});
}
