## Description and motivation

Helsinki City Bike App backend created with NestJS. Features building the database from source material and some CRUD features.

This framework was chosen because it runs on top of Express, provides out-the-box TypeScript support, has a clear application architecture and has an easy way to use TypeORM which in turn has support for many different databases and satisfies the needs of this application.

## Installation

```bash
$ npm install
```

## Database

Local PostgreSQL database is used by default. You can specify the database in .env file.

To build the database, have your database credentials specified and query _{APP_URL}/build_. Returns _true_ on successful build. Console will output results also.

NOTE! To speed up the build you can place .csv-files on their corresponding folders inside /src/data/. Otherwise data will be downloaded from internet.

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
