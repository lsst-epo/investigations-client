# This file is based on the official Next.js Docker example. https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . /app

RUN apk add --no-cache libc6-compat git
RUN yarn install --frozen-lockfile

ARG NEXT_PUBLIC_API_URL=https://rubin-obs-api-e3g4rcii3q-uc.a.run.app/api
ARG NEXT_PUBLIC_ASSETS_BASE_URL=https://rubin-obs-api-e3g4rcii3q-uc.a.run.app/assets
ARG NEXT_PUBLIC_ASTRO_API_URL=https://us-central1-skyviewer.cloudfunctions.net/astro-objects-api
ARG NEXT_PUBLIC_GOOGLE_APP_ID=688095955960-t0fpaj4ec3gh5vsr9lhg8govapk2oeo9.apps.googleusercontent.com

RUN npx browserslist@latest --update-db && yarn static:build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/ ./

USER nextjs

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 8080

CMD ["yarn", "start"]
