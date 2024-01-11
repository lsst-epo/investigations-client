# This file is based on the official Next.js Docker example. https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY . /app

RUN apk add --no-cache libc6-compat git fontconfig
RUN yarn install --frozen-lockfile

ARG NEXT_PUBLIC_API_URL=https://investigations-api-dot-skyviewer.uw.r.appspot.com/api
ARG NEXT_PUBLIC_BASE_URL=https://investigations-client-dot-skyviewer.uw.r.appspot.com/
ARG NEXT_PUBLIC_GOOGLE_APP_ID=688095955960-t0fpaj4ec3gh5vsr9lhg8govapk2oeo9.apps.googleusercontent.com
ARG GOOGLE_APP_SECRET=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
ARG CRAFT_SECRET_TOKEN=1128f3c472c118caa63
ARG CRAFT_EDUCATOR_SCHEMA_SECRET_TOKEN=KPYySxz0TZjIPAtNCdnYUkguZz6y6BU-
ARG CRAFT_STUDENT_SCHEMA_SECRET_TOKEN=vPNHdjzu4XwKhiYC0jDrQENzGxb2Ltx3

RUN npx browserslist@latest --update-db && yarn static:build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache fontconfig
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
