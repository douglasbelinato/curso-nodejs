### Postgres - Database
docker run \
    --name postgres \
    -e POSTGRES_USER=heroi_app \
    -e POSTGRES_PASSWORD=pass \
    -e POSTGRES_DB=herois \
    -p 5432:5432 \
    -d \
    postgres

### Postgres - Client
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

### Docker commands - Check containers status and connectivity
docker ps
docker exec -it postgres /bin/bash

### MongoDB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -e MONGO_INITDB_DATABASE=herois \
    -d \
    mongo:4

### MongoDB - Client
docker run \
    --name mongoclient \
    -p 3000:3000 \
    -e MONGO_URL=mongodb://admin:admin@mongodb:27017/admin \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

### MongoDB - Create application user after in MongoDB
docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'heroiapp', pwd: 'pass', roles: [{role: 'readWrite', db: 'herois'}]})"

### Sequelize - ORM
npm install sequelize

### Postgres Drivers - 'pg-store' and 'pg'
npm install pg-hstore pg