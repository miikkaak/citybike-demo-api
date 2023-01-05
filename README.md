## Description and motivation

Helsinki City Bike App backend created with NestJS. Features building the database from source material and some CRUD features.

This framework was chosen because it runs on top of Express, provides out-the-box TypeScript support, has a clear application architecture and has an easy way to use TypeORM which in turn has support for many different databases and satisfies the needs of this application.

## Installation

```bash
$ npm install
```

## Database

Local PostgreSQL database is used by default. You can specify the database in .env file.

To build the database, put the .csv-files in their corresponding folders inside /src/data/\*\*, have your database credentials specified and post _{APP_URL}/build_. Returns _true_ on build start. Server console will output the progress. Running migrations is not necessary because entities are synced in development mode, but you can also run the migrations with "npm run migration:run".

Note! I'll provide a ready-built database as an alternative, because the database build process is quite slow

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API endpoints

```
GET / - Server hello
```

```
POST /build - truncate and build database
```

```
GET /stations - Get stations based on pagination query
```

```
GET /stations/:id - Get station based on ID
```

```
GET /stations/count - Get amount of stations
```

```
POST /journeys/ - Create new journey
```

```
GET /journeys/ - Get journeys based on pagination query
```

```
GET /journeys/count - Get amount of journeys
```

```
GET /journeys/from/:id - Get journeys based on departure station
```

```
GET /journeys/to/:id - Get journeys based on return station
```
