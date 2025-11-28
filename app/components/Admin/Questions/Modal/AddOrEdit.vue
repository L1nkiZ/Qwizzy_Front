<script setup lang="ts">
import * as v from "valibot";
import { fetchAnswer } from "~/services/admin/answer.service";
import { fetchSubjects } from "~/services/admin/subjects.service";
import type { Question } from "~/types/question.type";

interface Props {
	question?: Question;
}
const props = defineProps<Props>();

const editionMode = computed(() => !!props.question);

const { data: subjects, status: subjectsStatus } = await fetchSubjects();

const subjectsItems = computed(() =>
	subjects.value
		? (
				subjects.value as { subject: { data: { id: number; name: string }[] } }
			).subject.data.map((subject) => ({
				value: subject.id,
				label: subject.name,
			}))
		: [],
);

const answer = ref<any>(null);

if (editionMode.value) {
	const { data: answerData } = await fetchAnswer(props.question?.id ?? 0);
	answer.value = answerData;
}

const questionAnswer = computed(() =>
	answer.value
		? (
				answer.value as {
					question: {
						answers: {
							id: number;
						};
					};
				}
			).question.answers.id
		: null,
);

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const state = reactive<{
	title: string;
	subjects: { value: number; label: string }[];
	difficulty_id: number;
	proposal_1: string;
	proposal_2: string;
	proposal_3: string;
	proposal_4: string;
	answer: number;
}>({
	title: props.question?.question || "",
	subjects: props.question?.subject
		? [
				{
					value: props.question.subject_id,
					label: props.question.subject,
				},
			]
		: [],
	difficulty_id: props.question?.difficulty.id || 0,
	proposal_1: props.question?.proposal_1 || "",
	proposal_2: props.question?.proposal_2 || "",
	proposal_3: props.question?.proposal_3 || "",
	proposal_4: props.question?.proposal_4 || "",
	answer: questionAnswer?.value || 1,
});

const schema = v.object({
	title: v.pipe(
		v.string(),
		v.minLength(10, "Veuillez entrer un titre de minimum 10 caractères."),
	),
	subjects: v.array(
		v.object({
			value: v.number(),
			label: v.string(),
		}),
	),
	difficulty_id: v.number(),
	proposal_1: v.string(),
	proposal_2: v.string(),
	proposal_3: v.string(),
	answer: v.string(),
});

async function updateOrCreate() {
	// Sinon, on valide le formulaire
	form.value?.validate();
	if (form.value?.errors.length === 0) {
		// Si pas d'enfants, on supprime directement
		if (!props.question) {
			// Création
		} else {
			// Modification
		}
	}
}
</script>

<template>
	<UModal
		:title="editionMode ? 'Modifier la question' : 'Ajouter une question'"
		:description="props.question?.question"
		:ui="{ footer: 'justify-end' }"
		class="max-w-120"
	>
		<template #body>
			<UForm
				:id="formId"
				ref="form"
				:state="state"
				:schema="schema"
				class="space-y-3"
				@submit="updateOrCreate"
			>
				<UFormField required name="title" label="Titre">
					<UInput
						v-model="state.title"
						required
						placeholder="De quelle couleur est le cheval blanc d'Henri IV ?"
						minlength="10"
					/>
				</UFormField>
				<UFormField required name="subject_id" label="Sujet">
					<UInputMenu
						v-model="state.subjects"
						multiple
						:loading="subjectsStatus === 'idle'"
						:items="subjectsItems"
					/>
				</UFormField>

				<USeparator label="Réponses" class="mt-8 mb-7" />

				<UFormField required name="proposal_1" label="Proposition 1">
					<UInput v-model="state.proposal_1" />
				</UFormField>
				<UFormField required name="proposal_2" label="Proposition 2">
					<UInput v-model="state.proposal_2" />
				</UFormField>
				<UFormField required name="proposal_3" label="Proposition 3">
					<UInput v-model="state.proposal_3" />
				</UFormField>
				<UFormField required name="proposal_4" label="Proposition 4">
					<UInput v-model="state.proposal_4" />
				</UFormField>

				<UFormField required name="answer" label="Réponse correcte">
					<UInput v-model="state.answer" type="number" min="1" max="4" />
				</UFormField>
			</UForm>
		</template>

		<template #footer="{ close }">
			<UButton color="neutral" variant="outline" @click="close">Fermer</UButton>
			<UButton type="submit" :form="formId">
				{{ props.question ? "Modifier" : "Ajouter" }}
			</UButton>
		</template>
	</UModal>
</template>
