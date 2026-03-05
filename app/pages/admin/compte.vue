<script setup lang="ts">
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
	const adminTokenCookie = useCookie("adminTokenCookie");

	adminTokenCookie.value = null;

	navigateTo("/admin/connexion");
}
</script>

<template>
	<div>
		<UButton color="neutral" variant="outline" @click="handleLogout">
			Se déconnecter
		</UButton>
	</div>
</template>
