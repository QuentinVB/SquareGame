# SquareGame
Game for studying Functionnal Programming (IN'TECH march 2020) with elm

## server
Simple express server

https://www.frugalprototype.com/developpez-propre-api-node-js-express/
https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd


Restore js package and launch dev server
```
cd server
npm install
npm start
```
backend dev server is : 127.0.0.1:3000

possible endpoint for testing :

- http://127.0.0.1:3000/grid
(it returns a simple grid)

- http://127.0.0.1:3000/ping
(it return a simple json object with ping string)

- http://127.0.0.1:3000/time
(it return a simple json object with timestamp)

## elm webapp

Restore elm package and launch
```
cd webapp
elm make src/Game.elm --output elmGame.js
elm reactor
```
front-end dev server is : 127.0.0.1:8000 then navigate to JsonCall.elm for json tests

❤️