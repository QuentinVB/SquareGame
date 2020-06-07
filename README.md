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

possible endpoint :

- POST : http://127.0.0.1:3000/new/:username
(return a game state, start a new game or join an already created one)

- GET : http://127.0.0.1:3000/:gameid
(return a game state of the requested gameid)

- POST : http://127.0.0.1:3000/:gameid/:username/:edgeid
(return a game state of the requested gameid after changing ownership of the requested edge id to the specified username)

## elm webapp

Restore elm package and launch
```
cd webapp
elm make src/Game.elm --output elmGame.js
elm reactor
```
front-end dev server is : 127.0.0.1:8000 then navigate to JsonCall.elm for json tests

❤️