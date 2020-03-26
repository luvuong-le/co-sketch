FROM node:10

# Create app directory and use it as working directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY package.json /usr/src/server
COPY yarn.lock /usr/src/server

RUN yarn

COPY . .

EXPOSE 8000

CMD [ "yarn", "run", "dev" ]