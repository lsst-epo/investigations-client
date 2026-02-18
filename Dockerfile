# This file is based on the official Next.js Docker example. https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --exclude=.env . /app

RUN apk add --no-cache libc6-compat git fontconfig
RUN yarn install --frozen-lockfile

# YARN-BUILDER: Compile the app
FROM builder AS yarn-builder
ARG RUN_BUILD="true"
ENV RUN_BUILD=${RUN_BUILD}

RUN --mount=type=bind,source=.env,target=/app/.env \
    if [ "$RUN_BUILD" = "true" ]; then \
      npx update-browserslist-db@latest && \
      yarn static:build; \
    fi

# FOR GCS bucket .next folder versioning
FROM scratch AS nextjs-copy
COPY --from=yarn-builder /app/.next /


# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache fontconfig
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=yarn-builder --chown=nextjs:nodejs /app/ ./

USER nextjs

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 8080
ENV PORT 8080

CMD ["yarn", "start"]
