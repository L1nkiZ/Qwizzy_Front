<script setup lang="ts">
import { fetchQuestions } from "~/services/admin/questions.service";
import type { Question } from "~/types/question.type";

import type { DataTableColumn } from "~/types/table.type";

import {
	AdminQuestionsModalAddOrEdit,
	AdminQuestionsModalDelete,
} from "#components";

type QuestionsResponse = {
	questions: {
		data: Question[];
	};
};

type EnrichedQuestion = Omit<Question, "subject" | "difficulty"> & {
	subjectName: string;
	difficultyName: string;
};

const { data: questions, pending, error } = await fetchQuestions();

console.log(questions.value);

const enrichedData = computed<EnrichedQuestion[]>(() =>
	questions.value
		? (questions.value as QuestionsResponse).questions.data.map(
				(question: Question) => ({
					...question,
					subjectName: question.subject.name,
					difficultyName: question.difficulty.name,
				}),
			)
		: [],
);

console.log(enrichedData.value);

const columns: DataTableColumn<EnrichedQuestion>[] = [
	{
		accessorKey: "question",
		labelInColumnSelect: "Nom complet",
		notHideable: true,
	},
	{
		accessorKey: "subjectName",
		labelInColumnSelect: "Sujet",
	},
	{
		accessorKey: "difficultyName",
		labelInColumnSelect: "Difficulté",
	},
	{
		accessorKey: "questionActions",
		labelInColumnSelect: "Actions",
		notSortable: true,
		meta: { class: { th: "w-50", td: "space-x-2" } },
	},
];

const hiddenColumnsForSearch = [{ accessorKey: "translatedRole" }];

const overlay = useOverlay();

const editOrAddModal = overlay.create(AdminQuestionsModalAddOrEdit);

function openAddOrEditModal(question?: Question) {
	editOrAddModal.open({ question: question });
}

const deleteModal = overlay.create(AdminQuestionsModalDelete);

function openDeleteModal(question: Question) {
	deleteModal.open({ question: question });
}
</script>

<template>
	<UContainer>
		<div class="mb-12">
			<div class="mb-4 flex justify-between md:mb-8 lg:mb-10 lg:text-2xl">
				<h1 class="text-lg font-semibold md:text-xl">Questions</h1>
				<UButton
					icon="i-lucide-plus"
					class="size-fit"
					@click="openAddOrEditModal()"
				>
					Ajouter une question
				</UButton>
			</div>
			<p class="mb-3">
				Toues les questions possèdent 4 propositions dont une seule est
				correcte. Elles sont obligatoirement associées à un sujet et une
				difficulté.
			</p>
		</div>

		<AdminDataLoading v-if="pending" />
		<AdminDataError v-else-if="error" />
		<AdminDataTable
			v-else
			:data="enrichedData"
			:columns
			:hidden-columns-for-search
		>
			<template #header-title="{ numberOfTotalRows }">
				Questions ({{ numberOfTotalRows }})
			</template>

			<template #question-header>Titre</template>

			<template #subject-header>Sujet</template>

			<template #difficulty-header>Difficulté</template>

			<template #questionActions-header>Actions</template>

			<template #questionActions-cell="{ row }">
				<UButton
					trailing-icon="i-lucide-settings"
					color="neutral"
					variant="outline"
					@click="openAddOrEditModal(row.original)"
				>
					Modifier
				</UButton>
				<UButton
					trailing-icon="i-lucide-trash-2"
					color="error"
					variant="soft"
					@click="openDeleteModal(row.original)"
				>
					Supprimer
				</UButton>
			</template>
		</AdminDataTable>
	</UContainer>
</template>
