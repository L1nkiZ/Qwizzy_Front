<script setup lang="ts">
interface Props {
	title?: string;
	columnsToDisplay?: { label: string; value: string; disabled?: boolean }[];
}

defineProps<Props>();

const searchFilter = defineModel<string>("searchFilter");
const selectedColumnsToDisplay = defineModel<string[]>(
	"selectedColumnsToDisplay",
);
</script>

<template>
	<div
		class="border-accented flex items-center justify-between gap-4 border-b p-4"
	>
		<div class="text-sm font-medium">
			<slot name="title">
				<template v-if="title">
					{{ title }}
				</template>
			</slot>
		</div>
		<div class="flex items-center gap-2">
			<slot name="leading"></slot>
			<UFormField
				v-if="searchFilter !== undefined"
				label="Rechercher parmis les données"
				:ui="{ label: 'sr-only', container: 'mt-0' }"
			>
				<UInput
					v-model="searchFilter"
					type="search"
					placeholder="Rechercher"
					trailing-icon="i-lucide-search"
				></UInput>
			</UFormField>
			<UFormField
				v-if="columnsToDisplay"
				label="Colonnes affichées"
				:ui="{ label: 'sr-only', container: 'mt-0' }"
			>
				<USelect
					v-model="selectedColumnsToDisplay"
					:items="columnsToDisplay"
					multiple
					placeholder="Colonnes affichées"
					class="w-44"
				></USelect>
			</UFormField>
			<slot name="trailing"></slot>
		</div>
	</div>
</template>
