# All targets are phony, there are no files associated or to check
.PHONY: help ls-images compose build compose-run run clear stop remove prune clean

# Absolute
CURRENT_ABSOLUTE_DIR = $(notdir $(shell pwd))

# Relative 
CURRENT_DIR = $(shell pwd)

# Docker Build Production Variables
DOCKER_BUILD_PROD_ARGS = --build-arg NODE_ENV=production

# Determine if using no cache option for build
ifeq ($(NO_CACHE), true)
	NO_CACHE_ARGS = --no-cache
endif

VOLUME_PATH = $(CURRENT_DIR)

help:
	@echo ''
	@echo 'Usage: make [TARGET] [EXTRA_ARGUMENTS]'
	@echo 'Targets:'
	@echo '  images    	    list all docker images --image--'
	@echo '  compose        build docker images for production or development using docker-compose --image--'
	@echo '  build     	    build docker images for production or development --image--'
	@echo '  compose-run    Run docker containers with docker-compose --container--'
	@echo '  run  		    Run docker containers --container--'
	@echo '  clean    	    remove docker --image--'
	@echo '  prune    	    shortcut for docker system prune -af. Cleanup inactive containers and cache.'
	@echo ''
	@echo 'Extra arguments:'
	@echo 'ENV=:	        determine environment [production or development] (defaults to development)'
	@echo 'NO_CACHE=:	    build containers with cache or not [true or false] (defaults to using cache)'
	@echo 'VOLUME_PATH=:	mounted volume path. This will be the root directory of the project (defaults to current directory)'

ls-images:
	docker images

compose: 
	@echo "Composing Docker Images"
	@if [ $(ENV) == "production" ]; then \
		cd docker && docker-compose -f docker-compose.yml -f docker-compose.prod.yml $(NO_CACHE_ARGS) build; \
	else 
		cd docker && docker-compose $(NO_CACHE_ARGS) build; \
	fi

build:
	@echo "Building Docker Images"
	@if [ "$(ENV)" == "production" ]; then \
		docker build --target server $(NO_CACHE_ARGS) $(DOCKER_BUILD_PROD_ARGS) -t co-sketch/server:latest . ;\
		docker build --target client $(NO_CACHE_ARGS) $(DOCKER_BUILD_PROD_ARGS) -t co-sketch/client:latest . ;\
		docker build --target nginx $(NO_CACHE_ARGS) $(DOCKER_BUILD_PROD_ARGS) -t co-sketch/nginx:latest . ;\
	else \
		docker build --target server $(NO_CACHE_ARGS) -t co-sketch/server:latest . ;\
		docker build --target client $(NO_CACHE_ARGS) -t co-sketch/client:latest . ;\
		docker build --target nginx $(NO_CACHE_ARGS) -t co-sketch/nginx:latest . ;\
	fi

compose-run: 
	@echo "Running with Docker Compose"
	@if [ "$(ENV)" == "production" ]; then \
		cd docker && docker-compose -f docker-compose.yml -f docker-compose.prod.yml up ;\
	else \
		cd docker && docker-compose up ;\
	fi

run: 
	@echo "Starting Up Containers..."
	@if [ "$(ENV)" == "production" ]; then \
		docker run -d -p 80:80 --name co-sketch-nginx co-sketch/nginx:latest ;\
		docker run -d -p 8000:8000 --name co-sketch-server co-sketch/server:latest ;\
	else \
		docker run -d --name co-sketch-server-dev -p 8000:8000 -v /$(VOLUME_PATH)/packages/server:/usr/src/co-sketch/packages/server co-sketch/server:latest yarn run dev ;\
		docker run -d -it --name co-sketch-client-dev -p 3000:3000 -v /$(VOLUME_PATH)/packages/client:/usr/src/co-sketch/packages/client co-sketch/client:latest yarn start ;\
	fi
	@echo "Containers Started!"

clear:
	make stop
	make remove

stop: 
	docker stop co-sketch-server-dev
	docker stop co-sketch-client-dev

remove:
	docker rm co-sketch-server-dev
	docker rm co-sketch-client-dev

prune: 
	docker image prune

clean:
	docker clean