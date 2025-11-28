type UpdateQuestion = {
	question: string;
	proposal_1: string;
	proposal_2: string;
	proposal_3: string;
	proposal_4: string;
	correct_answer_number: number;
	subject_id: number;
	difficulty_id: number;
	question_type_id: number;
};

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

export function updateQuestion(id: number, payload: UpdateQuestion) {
	return useNuxtApp().$apiFetch(`/questions/${id}`, {
		method: "PUT",
		body: payload,
	});
}
