#!/usr/bin/env sh
sed -i '' 's/ms-nodebootstrap-example/ms-user-microservice/g' docker-compose.yml 
sed -i '' 's/ms-nodebootstrap-example/ms-user-microservice/g' package.json 
rm -rf node_modules
npm run build
