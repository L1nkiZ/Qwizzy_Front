<script setup lang="ts">
import type { AuthFormField } from "@nuxt/ui";

useHead({
	title: "Qwizzy - Inscription",
	meta: [
		{
			name: "description",
			content: "Créez un compte pour accéder à vos scores et bien plus !",
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
				title="Inscription"
				description="Créez un compte pour accéder à vos scores et bien plus !"
				icon="i-lucide-user-round-plus"
				:fields="fields"
				class="max-w-md"
			>
				<template #description>
					Vous avez déjà un compte ?
					<ULink to="/connexion" class="text-primary font-medium">
						Connectez-vous
					</ULink>
				</template>
			</UAuthForm>
		</UPageCard>
	</div>
</template>
