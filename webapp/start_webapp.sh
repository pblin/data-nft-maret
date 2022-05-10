#!/bin/bash
CONTAINER_IMAGE=$1
if [ `docker ps | grep reblocapp | wc -l` -gt 0 ]; then
	docker stop reblocapp
fi
docker container prune -f
docker run -d --rm -p 3000:3000 -e NODE_ENV=production --name=reblocapp $CONTAINER_IMAGE