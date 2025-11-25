<script setup lang="ts">
import type { Question } from "~/types/question.type";

interface Props {
	question?: Question;
}
const props = defineProps<Props>();

const isEditing = computed(() => !!props.question);
</script>

<template>
	<UModal
		:title="isEditing ? `Modifier la question` : 'Ajouter une question'"
		:ui="{ footer: 'justify-end' }"
		class="max-w-160"
	>
		<template #body>
			<p>Formulaire d'ajout/modification de question à implémenter.</p>
		</template>

		<template #footer="{ close }">
			<UButton color="neutral" variant="outline" @click="close">Fermer</UButton>
			<UButton icon="i-lucide-save">Enregistrer</UButton>
		</template>
	</UModal>
</template>
