<script setup lang="ts">
import { fr } from "@nuxt/ui/locale";

import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const headerItems = computed<NavigationMenuItem[]>(() => [
	{
		label: "Qwizz",
		to: "/admin/qwizz/",
		active: route.path.startsWith("/admin/qwizz/"),
	},
	{
		label: "Questions",
		to: "/admin/questions/",
		active: route.path.startsWith("/admin/questions/"),
	},
	{
		label: "Catégories",
		to: "/admin/categories/",
		active: route.path.startsWith("/admin/categories/"),
	},
	{
		label: "Difficultés",
		to: "/admin/difficultes/",
		active: route.path.startsWith("/admin/difficultes/"),
	},
	{
		label: "Utilisateurs",
		to: "/admin/users/",
		active: route.path.startsWith("/admin/users/"),
	},
]);

const footerItems: NavigationMenuItem[] = [
	{
		label: "Mentions légales",
		to: "/mentions-legales",
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
	<UApp :locale="fr">
		<UHeader to="/admin">
			<template #title>Qwizzy - Admin</template>
			<UNavigationMenu :items="headerItems" />
			<template #right>
				<UButton
					icon="i-lucide-user"
					color="neutral"
					variant="ghost"
					to="/admin/compte"
				/>
				<UColorModeButton />
			</template>

			<template #body>
				<UNavigationMenu :items="headerItems" orientation="vertical" />
			</template>
		</UHeader>

		<UMain class="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
			<slot />
		</UMain>

		<!-- eslint-disable-next-line -->
		<UFooter>
			<template #left>
				<p class="text-muted text-sm">
					Copyright © {{ new Date().getFullYear() }}
				</p>
			</template>
			<UNavigationMenu
				:items="footerItems"
				variant="link"
				:ui="{
					list: 'flex-col sm:flex-row',
				}"
			/>
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
	</UApp>
</template>
