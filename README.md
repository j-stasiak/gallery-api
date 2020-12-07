## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with docker

```bash
# fully contenerized app
$ docker-compose up --build

# only mongodb + mongo express in containers 
$ docker-compose -f docker-compose.db.yml up --build

# and then you can normally start the app
$ npm run start:dev
```

## Creators

- [Jakub Stasiak](https://github.com/j-stasiak)

