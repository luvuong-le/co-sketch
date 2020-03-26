FROM node:10

# Create app directory and use it as working directory
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

COPY package.json /usr/src/client
COPY yarn.lock /usr/src/client

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]