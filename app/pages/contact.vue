<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

// Schéma de validation avec Valibot
const contactSchema = v.object({
	name: v.pipe(
		v.string("Le nom est requis"),
		v.minLength(2, "Le nom doit contenir au moins 2 caractères"),
		v.maxLength(100, "Le nom ne peut pas dépasser 100 caractères"),
	),
	email: v.pipe(
		v.string("L'email est requis"),
		v.email("L'email n'est pas valide"),
	),
	subject: v.pipe(
		v.string("Le sujet est requis"),
		v.minLength(5, "Le sujet doit contenir au moins 5 caractères"),
		v.maxLength(200, "Le sujet ne peut pas dépasser 200 caractères"),
	),
	message: v.pipe(
		v.string("Le message est requis"),
		v.minLength(10, "Le message doit contenir au moins 10 caractères"),
		v.maxLength(2000, "Le message ne peut pas dépasser 2000 caractères"),
	),
});

type ContactForm = v.InferOutput<typeof contactSchema>;

// État du formulaire
const state = reactive<ContactForm>({
	name: "",
	email: "",
	subject: "",
	message: "",
});

const loading = ref(false);

// Fonction de soumission
async function onSubmit(event: FormSubmitEvent<ContactForm>) {
	console.log(event);
}
</script>

<template>
	<div class="mx-auto max-w-2xl px-4 py-12">
		<!-- En-tête -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold">Contactez-nous</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Une question ? Une suggestion ? N'hésitez pas à nous contacter !
			</p>
		</div>

		<!-- Formulaire -->
		<UCard>
			<UForm
				class="space-y-5"
				:schema="contactSchema"
				:state
				@submit="onSubmit"
			>
				<!-- Nom -->
				<UFormField label="Nom" name="name" required>
					<UInput
						v-model="state.name"
						required
						placeholder="Votre nom"
						minlength="2"
						maxlength="100"
					/>
				</UFormField>

				<!-- Email -->
				<UFormField label="Email" name="email" required>
					<UInput
						v-model="state.email"
						type="email"
						required
						placeholder="votre@email.com"
					/>
				</UFormField>

				<!-- Sujet -->
				<UFormField label="Sujet" name="subject" required>
					<UInput
						v-model="state.subject"
						required
						placeholder="Sujet de votre message"
						minlength="5"
						maxlength="200"
					/>
				</UFormField>

				<!-- Message -->
				<UFormField label="Message" name="message" required>
					<UTextarea
						v-model="state.message"
						required
						placeholder="Votre message..."
						:rows="6"
						minlength="10"
						maxlength="2000"
					/>
				</UFormField>

				<!-- Bouton de soumission -->
				<UButton type="submit" class="ml-auto block" :loading>
					Envoyer le message
				</UButton>
			</UForm>
		</UCard>

		<!-- Informations supplémentaires -->
		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			<UCard class="text-center">
				<div class="mb-2 text-3xl">📧</div>
				<h3 class="mb-1 font-semibold">Email</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					contact@qwizzy.com
				</p>
			</UCard>

			<UCard class="text-center">
				<div class="mb-2 text-3xl">💬</div>
				<h3 class="mb-1 font-semibold">Support</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">24/7 disponible</p>
			</UCard>

			<UCard class="text-center">
				<div class="mb-2 text-3xl">⏱️</div>
				<h3 class="mb-1 font-semibold">Réponse</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">Sous 24h</p>
			</UCard>
		</div>
	</div>
</template>
