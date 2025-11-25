<script setup lang="ts">
import type { Question } from "~/types/question.type";
import {
	AdminQuestionsModalAddOrEdit,
	AdminQuestionsModalDelete,
} from "#components";
import type { DataTableColumn } from "~/types/table.type";
import { fetchQuestions } from "~/services/admin/questions.service";

type QuestionsResponse = {
	questions: {
		data: Question[];
	};
};

type EnrichedQuestion = Omit<Question, "subject" | "difficulty"> & {
	subject: string;
	difficulty: string;
};

const { data: questions, pending, error } = await fetchQuestions();

const enrichedData = computed<EnrichedQuestion[]>(() =>
	questions.value
		? (questions.value as QuestionsResponse).questions.data.map(
				(question: Question) => ({
					...question,
					subject: question.subject.name,
					difficulty: question.difficulty.name,
				}),
			)
		: [],
);

const columns: DataTableColumn<EnrichedQuestion>[] = [
	{
		accessorKey: "question",
		labelInColumnSelect: "Nom complet",
		notHideable: true,
	},
	{
		accessorKey: "subject",
		labelInColumnSelect: "Sujet",
	},
	{
		accessorKey: "difficulty",
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
			<h1
				class="mb-4 text-lg font-semibold md:mb-8 md:text-xl lg:mb-10 lg:text-2xl"
			>
				Questions
			</h1>
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
			:columns="columns"
			:hidden-columns-for-search="hiddenColumnsForSearch"
		>
			<template #header-title="{ numberOfTotalRows }">
				Questions ({{ numberOfTotalRows }})
			</template>

			<template #question-header>Nom</template>

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
					@click="openDeleteModal(row.original)"
				>
					Supprimer
				</UButton>
			</template>
		</AdminDataTable>
	</UContainer>
</template>
