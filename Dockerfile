########################################
# Lerna Bootstrap Build
########################################

FROM mhart/alpine-node:12 AS builder

WORKDIR /usr/src/co-sketch/

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

WORKDIR /usr/src/co-sketch/

COPY --from=builder /usr/src/co-sketch /usr/src/co-sketch/
COPY packages /usr/src/co-sketch/packages/

WORKDIR /usr/src/co-sketch/packages/server/

CMD [ "yarn", "start" ]

########################################
# Client
########################################

FROM mhart/alpine-node:12 AS client

WORKDIR /usr/src/co-sketch/

COPY --from=builder /usr/src/co-sketch /usr/src/co-sketch/
COPY packages /usr/src/co-sketch/packages/

WORKDIR /usr/src/co-sketch/packages/client/

RUN yarn run build

########################################
# Nginx
########################################

FROM nginx AS nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=client /usr/src/co-sketch/packages/client/build /usr/share/nginx/html/