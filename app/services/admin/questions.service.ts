/**
 * Récupère la liste de toutes les questions
 * @returns Promise contenant les données des questions et une éventuelle erreur
 */
export function fetchQuestions() {
	return useApiFetch("/questions", {
		params: {
			current_sort: "id",
			current_sort_dir: "asc",
			per_page: 10000,
		},
	});
}
