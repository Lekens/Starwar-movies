# Starwar-movies
Create a small set of rest API endpoints using NodeJS that can be used for listing the names of Star Wars movies along with their opening crawls and comment counts, adding and listing anonymous comments for a movie, and getting the character list for a movie.

# Application installation Process

## Prerequisites

1. Installed Node version >= 10
2. Installed npm version >= 5.6
3. Installed git

## 1. Clone the Starwar-movies from [repository](https://github.com/Lekens/Starwar-movies)

```bash
git clone https://github.com/Lekens/Starwar-movies
```

go inside the folder:

```bash
cd Starwar-movies
```

## 2. Run the project:

1. Copy env.example and insert it in the root directory;
2. Rename it with .env
3. Note that the content of .env.example are actual secret
4. but are included just for the purpose of the examiner
   For example:

```
NODE_ENV=development
PORT='8010'
BASE_URL='/api/v1/'
APIKEY='test-api-key-sample'
APP_BASE_URL='http://localhost:8010'
GET_MOVIES='https://swapi.dev/api/films/'
DB_NAME='starwar_movies'


```

Then run the following commands:

```bash
npm install
```

```bash
nodemon ./bin/www.js
```
or

```bash
npm start
```

App will be available [here](http://localhost:8010)

## 3. Open the app for usage

Navigate to [here](http://localhost:8010/swagger/documentation) to use the swagger doc or open a postman to test endpoints.

## 4. Running test cases: jest

On the terminal, run the command to start testing


```bash
npm test
```
