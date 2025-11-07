<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

useHead({
	title: "Qwizzy - Le meilleur site de qwizz",
	meta: [
		{
			name: "description",
			content:
				"Découvrez une variété de qwizz sur différents sujets et testez vos connaissances avec Qwizzy.",
		},
	],
});

const links = ref<ButtonProps[]>([
	{
		label: "Explorez les qwizz",
		to: "/qwizz",
		icon: "i-lucide-square-play",
	},
	{
		label: "Qwizz du jour",
		to: "/qwizz-du-jour/",
		color: "neutral",
		variant: "subtle",
		trailingIcon: "i-lucide-arrow-right",
	},
]);
</script>

<template>
	<UPageHero
		title="Le meilleur site de quiz"
		description="Accédez à une multitude de quiz sur divers sujets et testez vos connaissances tout en vous amusant."
		orientation="horizontal"
		:links="links"
	>
		<img
			src="/public/images/hero.png"
			alt="App screenshot"
			class="ring-default rounded-lg shadow-2xl ring"
		/>
	</UPageHero>
</template>
