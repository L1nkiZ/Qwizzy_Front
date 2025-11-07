<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

useHead({
	title: "Qwizzy - Connexion",
	meta: [
		{
			name: "description",
			content: "Connectez-vous à votre compte Qwizzy pour accéder à vos qwizz.",
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
	{
		name: "remember",
		label: "Remember me",
		type: "checkbox",
		defaultValue: true,
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
			>
				<template #description>
					Vous n'avez pas de compte ?
					<ULink to="/inscription" class="text-primary font-medium">
						Inscrivez-vous
					</ULink>
				</template>
			</UAuthForm>
		</UPageCard>
	</div>
</template>
