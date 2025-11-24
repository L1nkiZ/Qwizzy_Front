<script setup lang="ts">
import type { User } from "~/types/user.type";

interface Props {
	user: User;
}
defineProps<Props>();
</script>

<template>
	<UModal :title="`Modifier le rôle de ${user.name}`">
		<template #body>
			<p>Tous les rôles possèdent les capacités du niveau inférieur.</p>
			<p>Description des rôles :</p>
			<ul>
				<li>Admin : Peut gérer les comptes et leurs rôles</li>
				<li>
					Rédacteur : Peut ajouter, supprimer ou modifier le contenu des qwizzs
				</li>
				<li>Utilisateur : Peut accéder aux qwizzs et y répondre</li>
			</ul>
		</template>
	</UModal>
</template>
