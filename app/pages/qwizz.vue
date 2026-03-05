<script setup lang="ts">
import * as v from "valibot";

import { fetchCategories } from "~/services/admin/categories.service";
import { getQuestions } from "~/services/user/quiz.service";

useHead({
	title: "Qwizzy - Qwizz",
	meta: [
		{
			name: "description",
			content:
				"Découvrez une variété de qwizz sur différents sujets et testez vos connaissances avec Qwizzy.",
		},
	],
});

const { data: categoriesFetch } = await fetchCategories();
const pending = ref(false);
const questions = ref(null);
const questionIndex = ref(0);

const categories = computed(() =>
	categoriesFetch.value
		? categoriesFetch.value.subject.data.map((category) => ({
				value: category.id,
				label: category.name,
			}))
		: [],
);

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const state = reactive<{
	numberOfQuestions: number;
	category?: {
		value: number;
		label: string;
	};
}>({
	numberOfQuestions: 5,
});

const schema = v.object({
	numberOfQuestions: v.pipe(
		v.number(),
		v.minValue(1, "Le nombre de questions doit être au moins 1"),
		v.maxValue(20, "Le nombre de questions doit être au maximum 20"),
	),
	category: v.optional(
		v.object({
			value: v.number(),
			label: v.string(),
		}),
	),
});

async function generateQuiz() {
	form.value?.validate();
	questionIndex.value = 0;
	questions.value = null;

	// Si pas d'erreurs dans le form, on peut créer ou modifier la question
	if (form.value?.errors.length === 0) {
		try {
			pending.value = true;

			const response = await getQuestions({
				numberOfQuestions: state.numberOfQuestions,
				categoryId: state.category?.value,
			});

			questions.value = response.questions;

			questionIndex.value = 1;
		} catch (error) {
			useErrorToast({
				title: "Erreur lors de la génération du quiz",
				description: (error as Error).message,
			});
		} finally {
			pending.value = false;
		}
	}
}
</script>

<template>
	<div>
		<h1 class="mb-20 text-2xl">
			Générez un quiz et répondez aux questions que nous vous proposerons !
		</h1>

		<UPageCard v-if="questionIndex === 0" class="mx-auto max-w-100">
			<UForm
				:id="formId"
				ref="form"
				:state
				:schema
				class="space-y-4"
				@submit.prevent="generateQuiz"
			>
				<UFormField
					required
					name="numberOfQuestions"
					label="Nombre de questions"
				>
					<UInputNumber
						v-model="state.numberOfQuestions"
						required
						:min="1"
						:max="20"
					/>
				</UFormField>
				<UFormField name="category" label="Catégorie (optionnel)">
					<UInputMenu
						v-model="state.category"
						placeholder="Sélectionnez une catégorie"
						:items="categories"
					/>
				</UFormField>

				<UButton type="submit" :form="formId" class="ml-auto">
					Générer le quiz
				</UButton>
			</UForm>
		</UPageCard>

		<div v-else class="mx-auto max-w-160">
			<h2 class="mb-6 text-xl">
				Question {{ questionIndex }} / {{ questions.length }}
			</h2>
			<UPageCard>
				<p class="mb-4">Thème : {{ questions[questionIndex - 1].subject }}</p>
				<p class="mb-4">Question : {{ questions[questionIndex - 1].title }}</p>
			</UPageCard>
		</div>
	</div>
</template>
