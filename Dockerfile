# This file is based on the official Next.js Docker example. https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Rebuild the source code only when needed
FROM node:26.12.1-alpine AS builder
WORKDIR /app
COPY --exclude=.env . /app

RUN apk add --no-cache libc6-compat git fontconfig
RUN npm install -g corepack && corepack enable
RUN yarn install --immutable

# YARN-BUILDER: Compile the app
FROM builder AS yarn-builder
RUN --mount=type=bind,source=.env,target=/app/.env \
    npx update-browserslist-db@latest && yarn static:build

# FOR GCS bucket .next folder versioning
FROM scratch AS nextjs-copy
COPY --from=yarn-builder /app/.next /

# Production image, copy all the files and run next
FROM yarn-builder AS runner
WORKDIR /app

RUN apk add --no-cache fontconfig
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=yarn-builder --chown=nextjs:nodejs /app/ ./

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 8080
ENV PORT 8080

CMD ["yarn", "start"]