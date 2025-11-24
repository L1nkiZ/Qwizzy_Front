<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { User } from "~/types/user.type";
import { AdminUsersRoleModal } from "#components";

const data: User[] = [
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
	{ id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
];

const columns: TableColumn<User>[] = [
	{
		accessorKey: "name",
	},
	{
		accessorKey: "email",
	},
	{
		accessorKey: "role",
	},
	{
		accessorKey: "actions",
	},
];

const overlay = useOverlay();
const roleModal = overlay.create(AdminUsersRoleModal);

function openRoleModal(user: User) {
	roleModal.open({ user: user });
}
</script>

<template>
	<div>
		<h1
			class="mb-6 text-lg font-semibold md:mb-8 md:text-xl lg:mb-10 lg:text-2xl"
		>
			Utilisateurs
		</h1>

		<UTable :data="data" :columns="columns" class="bg-default">
			<template #name-header>Nom complet</template>
			<template #email-header>Email</template>
			<template #role-header>Rôle</template>
			<template #actions-header>Actions</template>

			<template #actions-cell="{ row }">
				<UButton
					trailing-icon="i-lucide-settings"
					color="neutral"
					variant="outline"
					@click="openRoleModal(row.original)"
				>
					Modifier le rôle
				</UButton>
			</template>
		</UTable>
	</div>
</template>
