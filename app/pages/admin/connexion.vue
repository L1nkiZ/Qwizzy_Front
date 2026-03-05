<script setup lang="ts">
import * as v from "valibot";

import { login } from "~/services/admin/auth.service";

import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";

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
		required: true,
		name: "email",
		type: "email",
		label: "Email",
	},
	{
		required: true,
		name: "password",
		type: "password",
		label: "Mot de passe",
	},
	{
		required: true,
		name: "remember",
		label: "Remember me",
		type: "checkbox",
		defaultValue: true,
	},
]);

const schema = v.object({
	email: v.pipe(
		v.string("Veuillez entrer une adresse email."),
		v.email("Veuillez entrer une adresse email valide."),
	),
	password: v.pipe(v.string("Le mot de passe doit être renseigné.")),
	remember: v.boolean("Veuillez indiquer si vous souhaitez rester connecté."),
});

type Schema = v.InferOutput<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
	await login(payload.data.email, payload.data.password)
		.then((response) => {
			const adminTokenCookie = useCookie(
				"adminTokenCookie",
				payload.data.remember
					? {
							maxAge: 60 * 60 * 24 * 30,
						}
					: undefined,
			); // Cookie valable pendant 30 jours si "Remember me" est coché, sinon cookie de session

			adminTokenCookie.value = response;
			navigateTo("/admin");
		})
		.catch((error) => {
			useErrorToast({
				title: "Erreur lors de la connexion",
				description: error.message,
			});
		});
}
</script>

<template>
	<div class="mt-20 flex flex-1 items-center justify-center p-4">
		<UPageCard class="w-full max-w-md">
			<UAuthForm
				title="Connexion"
				icon="i-lucide-user"
				:fields
				:schema
				class="max-w-md"
				@submit="onSubmit"
			/>
		</UPageCard>
	</div>
</template>
