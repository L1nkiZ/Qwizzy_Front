import type { User } from "~/types/user.type";

/**
 * Connexion d'un user
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Promise contenant les données de l'utilisateur connecté et une éventuelle erreur
 */
export function authLogin(email: string, password: string) {
	return useNuxtApp().$apiFetch<User[]>("/auth/login", {
		method: "POST",
		body: { email, password },
	});
}

/**
 * Met à jour le rôle d'un user
 * @param userId ID de l'utilisateur
 * @param role Nouveau rôle de l'utilisateur
 * @returns Promise contenant les données de l'utilisateur mis à jour et une éventuelle erreur
 */
export function updateUserRole(userId: number, role: string) {
	return useApiFetch<User>(`/admin/users/${userId}`, {
		method: "PUT",
		body: { role },
	});
}
