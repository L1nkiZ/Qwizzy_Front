<script setup lang="ts">
import type { Question } from "~/types/question.type";

interface Props {
	question: Question;
}
const props = defineProps<Props>();
</script>

<template>
	<UModal
		title="Supprimer la question"
		:ui="{ footer: 'justify-end' }"
		class="max-w-160"
	>
		<template #body>
			<p>
				Êtes-vous sûr de vouloir supprimer la question "{{
					props.question.name
				}}"? Cette action est irréversible.
			</p>
		</template>

		<template #footer="{ close }">
			<UButton color="neutral" variant="outline" @click="close">
				Annuler
			</UButton>
			<UButton color="error" icon="i-lucide-trash-2">Supprimer</UButton>
		</template>
	</UModal>
</template>
