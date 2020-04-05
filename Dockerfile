########################################
# Lerna Bootstrap Build
########################################

FROM mhart/alpine-node:12 AS builder

RUN mkdir -p /co-sketch
WORKDIR /co-sketch

COPY package.json yarn.lock lerna.json ./

RUN yarn install

COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/client/package.json ./packages/client/

RUN yarn run bootstrap

########################################
# Server
########################################

FROM mhart/alpine-node:12 AS server

RUN mkdir -p /co-sketch/
WORKDIR /co-sketch/

COPY --from=builder /co-sketch /co-sketch
COPY packages /co-sketch/packages

WORKDIR /co-sketch/packages/server


########################################
# Client
########################################

FROM mhart/alpine-node:12 AS client

RUN mkdir -p /co-sketch/
WORKDIR /co-sketch/

COPY --from=builder /co-sketch /co-sketch
COPY packages /co-sketch/packages

WORKDIR /co-sketch/packages/client
