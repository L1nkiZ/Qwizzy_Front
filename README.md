# Lancer l'application

Veuillez vous référer aux instructions fournies dans le repository Qwizzy_Env pour lancer tous les composants de l'application ensemble.
Pour lancer le front seul, vous pouvez vous référer aux informations fournies [ici](./README.docker.md).
Toutes les pages sont accessibles depuis le menu du header en front usager ("/") ou bien en backoffice admin ("/admin/")

# Connexion au compte

## Joueur

Connexion via la page "/connexion/"

- email : member@example.com
- mot de passe : password

## Admin

Connexion via la page "/admin/connexion/"

- email : admin@example.com
- mot de passe : password

# Informations techniques

## Stack

- **Framework**: Nuxt 4 + TypeScript
- **UI Library**: Nuxt UI v4 + TailwindCSS
- **State Management**: Pinia
- **Package Manager**: pnpm

## Particularités Nuxt 4

### Auto-imports

- **Vue**: `ref`, `computed`, `watch`, etc.
- **Composables**: `useState`, `useRouter`, `useFetch`, etc.
- **Composants**: Auto-importés depuis `components/`
- **Stores**: `usePinia`, `defineStore`, `storeToRefs`, `acceptHMRUpdate`, `use*Store` depuis `stores/` sont auto-importés
- **Utils**: Fonctions depuis `utils/` sont auto-importées
