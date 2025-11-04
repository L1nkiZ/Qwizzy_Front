import type { FetchError } from "ofetch";
import type { ToastProps } from "@nuxt/ui";

export interface UseErrorToastOptions {
	error?: Ref<FetchError | undefined>;
	title?: ToastProps["title"];
	description?: ToastProps["description"];
	icon?: ToastProps["icon"];
	actions?: ToastProps["actions"];
	contactSupport?: boolean;
	retry?: () => Promise<void>;
}

/**
 * Affiche un toast d'erreur dont tous les params sont optionnels et utilise des valeurs par défaut en cas d'absence.
 *
 * @param options - Options du toast d'erreur
 * @param options.error - L'erreur du fetch
 * @param options.title - Titre
 * @param options.description - Description
 * @param options.icon - Icône
 * @param options.actions - Boutons actions
 * @param options.contactSupport - Afficher le bouton de contact support
 * @param options.retry - Callback à exécuter lors du clic sur retry
 */
export function useErrorToast(options: UseErrorToastOptions = {}) {
	const { error, title, description, icon, actions, retry } = options;
	const contactSupport = options.contactSupport ?? true;
	const { $i18n } = useNuxtApp() as any;
	const t = $i18n.t;

	let actionButtons: UseErrorToastOptions["actions"] = actions ?? [];
	if (error?.value && retry) {
		actionButtons = [
			...actionButtons,
			{
				size: "sm",
				label: t("retry"),
				color: "error",
				onClick: async () => {
					await retry();
					if (error?.value) {
						useErrorToast({ error: error });
					}
				},
			},
		];
	}
	if (contactSupport) {
		actionButtons = [
			...actionButtons,
			{
				size: "sm",
				label: t("contactSupport"),
				color: "neutral",
				variant: "outline",
				to: "/admin/support",
			},
		];
	}

	useToast().add({
		title:
			title ??
			t("anErrorOccurred") +
				(error?.value ? ` (${error.value.statusCode})` : ""),
		description:
			description ?? t("thereWasAnErrorDuringTheTreatmentOfYourRequest"),
		icon: icon ?? "i-lucide-circle-alert",
		color: "error",
		actions: actionButtons,
	});
}
