<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

useHead({
	title: "Qwizzy - Mon Compte",
	meta: [
		{
			name: "description",
			content: "Gérez vos informations de compte et vos qwizz sur Qwizzy.",
		},
	],
});

function handleLogout() {
	const userTokenCookie = useCookie("userTokenCookie");

	userTokenCookie.value = null;

	navigateTo("/");
}
</script>

<template>
	<div>
		<UButton color="neutral" variant="outline" @click="handleLogout">
			Se déconnecter
		</UButton>
	</div>
</template>
