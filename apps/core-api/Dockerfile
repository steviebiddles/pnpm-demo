### Base ###

FROM node:12-slim as base
EXPOSE 3000
ARG NODE_AUTH_TOKEN
ENV PNPM_VERSION 5.2.6 # Control pnpm version dependency explicitly
ENV NODE_ENV=production
ENV NODE_AUTH_TOKEN $NODE_AUTH_TOKEN

RUN apt-get update -qq && \
    apt-get install -qy \
    git \
    nano \
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

FROM base as install
WORKDIR /usr/src

# Top-level monorepo concerns
COPY .npmrc .npmrc
COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY pnpm-lock.yaml pnpm-lock.yaml

# App specific concerns
COPY apps/core-api/package.json /usr/src/apps/core-api/

# Install concerns
RUN pnpm install --recursive --prod && \
    rm -rf ~/.pnpm-store

### Production ###

FROM install as prod
WORKDIR /usr/src/apps/core-api
COPY apps/core-api ./
RUN pnpm install --prod && \
    rm -rf ~/.pnpm-store
RUN chown -R node:node ./
USER node
CMD [ "node", "index.js" ]

### Test ###

FROM install as test
ENV NODE_ENV=development
WORKDIR /usr/src/apps/core-api
RUN pnpm install
CMD [ "pnpm", "run", "test" ]

### Development ###

FROM install as dev
ENV NODE_ENV=development
WORKDIR /usr/src/apps/core-api
RUN pnpm install nodemon -g --loglevel notice
RUN pnpm install
CMD [ "nodemon", "-L", "--inspect=0.0.0.0:9229", "index.js" ]
