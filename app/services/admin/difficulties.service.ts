import type { Difficulty } from "~/types/difficulty.type";

/**
 * Récupère la liste de toutes les difficultés
 * @returns Promise contenant les données des difficultés et une éventuelle erreur
 */
export function fetchDifficulties() {
	return useApiFetch<{ difficulty: { data: Difficulty[] } }>("/difficulties", {
		params: {
			current_sort: "id",
			current_sort_dir: "asc",
			per_page: 10000,
		},
	});
}
