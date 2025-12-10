# API Routes

Auth and cookie-setting has been refactored out of server actions/helpers and into routes for a cleaner separation and more explicit separation between client and server-side interaction. Both call utility functions contained within `/lib/auth`, and `/components/auth/serverHelpers.ts` is deprecated.

- `/auth` handles authentication and makes GQL requests out to the Craft GQL API, specifically interacting with the GraphQL Authentication plugin
- `/cookie` handles setting the GraphQL Authentication auth values in the response, but the `/lib/auth/cookiesService.ts` handles setting the auth values in the server-side `next/headers` cookie store
- `to-do: flesh out more`