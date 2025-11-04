<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const headerItems = computed<NavigationMenuItem[]>(() => [
	{
		label: "Quizs",
		to: "/quizs/",
		active: route.path.startsWith("/quizs/"),
	},
	{
		label: "Quiz du jour",
		to: "/quiz-du-jour/",
		active: route.path.startsWith("/quiz-du-jour/"),
	},
]);

const footerItems: NavigationMenuItem[] = [
	{
		label: "Mentions légales",
		to: "/mentions-légales",
	},
	{
		label: "Politique de confidentialité",
		to: "/politique-de-confidentialite",
	},
	{
		label: "Contact",
		to: "/contact",
	},
];
</script>

<template>
	<UHeader>
		<template #title>
			<AppLogo class="h-6 w-auto" />
		</template>
		<UNavigationMenu :items="headerItems" />
		<template #right>
			<UButton
				icon="i-lucide-user"
				color="neutral"
				variant="ghost"
				to="/compte"
			></UButton>
			<UColorModeButton />
		</template>
	</UHeader>

	<div class="flex flex-1 flex-col">
		<slot></slot>
	</div>

	<!-- eslint-disable-next-line -->
	<UFooter>
		<template #left>
			<p class="text-muted text-sm">
				Copyright © {{ new Date().getFullYear() }}
			</p>
		</template>
		<UNavigationMenu :items="footerItems" variant="link" />
		<template #right>
			<UButton
				icon="i-simple-icons-github"
				color="neutral"
				variant="ghost"
				to="https://github.com/L1nkiZ/Qwizzy_Front"
				target="_blank"
				aria-label="GitHub"
			/>
		</template>
	</UFooter>
</template>
