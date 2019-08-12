# GoBarber

Developer barber app for study (GoStack Rocketseat)

> This app is designed for study through the Rocketseat GoStack course.

see [Rocketseat](https://rocketseat.com.br/)

## Techs

1. [NodeJS](https://nodejs.org/en/)
2. [ExpressJS](https://expressjs.com/pt-br/)
3. [ReactJS](https://pt-br.reactjs.org/)
4. [React Native](https://facebook.github.io/react-native/)
5. [Docker](https://www.docker.com/)
6. [MongoDB](https://hub.docker.com/_/mongo)
7. [PostgreSQL](https://hub.docker.com/_/postgres)
8. [Redis](https://hub.docker.com/_/redis)

## Backend Usage

**install docker**

> see [Docker](https://www.docker.com/)

**create a postgres database with docker**

```bash
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

**create a mongodb database with docker**
```bash
docker run --name mongobarber -p 27017:27017 -d -t mongo
```

**create redis with docker (for queues)**

```bash
docker run --name redisgobarber -p 6379:6379 -d -t redis:alpine
```

make sure the containers are running

**clone repository**

```bash
git clone https://github.com/thiagolago1/GoBarber.git
```

**install dependencys**

```bash
cd path/to/project

yarn install
```

**execute database migrations**

```bash
yarn sequelize db:migrate
```

**run express server**

```bash
yarn dev
```

**run queues**

```bash
yarn queue
```

**for http requests I recommend insomnia Rest client**

> see [Insomnia](https://insomnia.rest/download/)

**interface for postgres I recommend postbird**

> see [Postbird](https://electronjs.org/apps/postbird)

**interface for mongodb I recommend MongoDB Compass**

> see [MongoDb Compass](https://www.mongodb.com/products/compass)

## Frontend Usage

coming soon
