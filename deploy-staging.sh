#!/bin/bash
git checkout dev
git pull origin
docker stop rms-fe-staging
docker rm rms-fe-staging
docker build -t rms-fe-staging .
docker run -dp 11001:80 --name rms-fe-staging rms-fe-staging