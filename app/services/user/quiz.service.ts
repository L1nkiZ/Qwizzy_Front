type Quiz = {
	numberOfQuestions: number;
	categoryId?: number;
};

/**
 * Récupère les questions pour un quiz
 * @param payload Données du quiz pour lesquelles récupérer les questions
 * @returns Promise contenant les données des questions et une éventuelle erreur
 */
export function getQuestions(payload: Partial<Quiz>) {
	return useNuxtApp().$apiFetch("/game/getQuestions", {
		method: "POST",
		body: payload,
	});
}
