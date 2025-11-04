<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

useHead({
	title: "Qwizzy - Connexion",
	meta: [
		{
			name: "description",
			content: "Connectez-vous à votre compte Qwizzy pour accéder à vos quiz.",
		},
	],
});

const fields = ref<AuthFormField[]>([
	{
		name: "email",
		type: "text",
		label: "Email",
	},
	{
		name: "password",
		type: "password",
		label: "Mot de passe",
	},
]);
</script>

<template>
	<div class="flex flex-1 items-center justify-center">
		<UPageCard class="w-full max-w-md">
			<UAuthForm
				title="Connexion"
				description="Entrez vos identifiants pour accéder à votre compte."
				icon="i-lucide-user"
				:fields="fields"
				class="max-w-md"
			/>
		</UPageCard>
	</div>
</template>
