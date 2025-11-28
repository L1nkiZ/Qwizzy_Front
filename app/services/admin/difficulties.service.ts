/**
 * Récupère la liste de toutes les sujets
 * @returns Promise contenant les données des sujets et une éventuelle erreur
 */
export function fetchDifficulties() {
	return useApiFetch("/difficulties", {
		params: {
			current_sort: "id",
			current_sort_dir: "asc",
			per_page: 10000,
		},
	});
}
