<script setup lang="ts">
import * as v from "valibot";
import type { Question } from "~/types/question.type";

interface Props {
	question?: Question;
}
const props = defineProps<Props>();

const isEditing = computed(() => !!props.question);

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const state = reactive<{
	title: string;
	subject_id: number;
	difficulty_id: number;
	proposal_1: string;
	proposal_2: string;
	proposal_3: string;
	answer: string;
}>({
	title: "",
	subject_id: 0,
	difficulty_id: 0,
	proposal_1: "",
	proposal_2: "",
	proposal_3: "",
	answer: "",
});

const schema = v.object({
	title: v.pipe(
		v.string(),
		v.minLength(10, "Veuillez entrer un titre de minimum 10 caractères."),
	),
	subject_id: v.number(),
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
		:title="isEditing ? 'Modifier la question' : 'Ajouter une question'"
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
				<UFormField required name="subject_id" label="Sujet" class="mb-6">
					<UInputMenu v-model="state.subject_id" multiple :items="subjects" />
				</UFormField>
				<UFormField required name="proposal_1" label="Proposition 1">
					<UInput v-model="state.proposal_1" />
				</UFormField>
				<UFormField required name="proposal_2" label="Proposition 2">
					<UInput v-model="state.proposal_2" />
				</UFormField>
				<UFormField required name="proposal_3" label="Proposition 3">
					<UInput v-model="state.proposal_3" />
				</UFormField>
				<UFormField required name="answer" label="Réponse correcte">
					<UInput v-model="state.answer" />
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
