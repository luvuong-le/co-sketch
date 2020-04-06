# Co-Sketch

Demo project for learning about monorepos and docker together. This app should will allow people to join a room and draw on a canvas together using **websockets**.

## Architecture

This project makes use of the monorepo approach using **lerna** and **yarn workspaces** while using Docker for containerization.

During **_development_** there will be a client and server container that will run and interact together.

- `Client`: `co-sketch/client`
- `Server`: `co-sketch/server`

During **_production_** instead of a client running react, nginx will act as a server to host the build artifacts from react and also act as a **reverse proxy** for incoming requests.

- `Nginx`: `co-sketch/nginx`
- `Server`: `co-sketch/server`

## Setup

**Note**: You must have docker, node and yarn/npm to run this project

## Docker Container Sizes

### Production

- Nginx: ~128MB
- Server: ~248MB

### Development

- Server: ~248MB
- Client: ~254MB

## Using Docker

You can use `COMPOSE_DOCKER_CLI_BUILD=1` and `DOCKER_BUILDKIT=1` for more efficient builds however windows does not currently support this.

**Note**: You must be in the /docker directory when using docker compose

### Building Images [Docker Compose]

- Run for development: `docker-compose build`
- Run for production: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml build`

### Running Images with [Docker Compose]

> Note: You must be in the docker directory

- Run for development: `docker-compose up`
- Run for production: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

### Build Docker Images _without Compose_

- Server: `docker build --target server -t co-sketch/server:latest .`
- Client: `docker build --target client -t co-sketch/client:latest .`
- Nginx: `docker build --target nginx -t co-sketch/nginx:latest .`

### Run Docker Images _without Compose_

#### **Development**

- Server: `docker run --name co-sketch-server-dev -p 8000:8000 -v <path-to-folder>:/co-sketch/packages/server co-sketch/server:latest yarn run dev`
- Client: `docker run it --name co-sketch-client-dev -p 3000:3000 -v <path-to-folder>:/co-sketch/packages/client co-sketch/client:latest yarn start`

#### **Production**

- Nginx: `docker run -d -p 80:80 --name co-sketch-nginx co-sketch/nginx:latest`
- Server: `docker run -d -p 8000:8000 --name co-sketch-server co-sketch/server:latest`
