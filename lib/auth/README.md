# Auth Services

Services that are used across multiple components or routes are stored here:

- `authService.ts` makes the GraphQL mutate request out to the Craft GQL API and calls `cookieService.ts` to set those cookies
- `cookieService.ts` exports functions for getting/setting cookies from/to the `next/headers` cookie store
- `to-do: flesh this out more`