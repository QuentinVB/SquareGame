'use strict';
var Game = require('../models/Game'); //created model loading here
var Player = require('../models/PLayer'); //created model loading here

//TODO : should be a key/value "dictionnary" with key as GameId and Value as Games
var activegame;

/*
var gametest = new Game (3);
var test = gametest.getGameState();
*/
//gametest.createNewGrid();

//a naked game for the tests
exports.getgrid = function(req, res) {
  var gametest = new Game (3);
  gametest.createNewGrid();
    res.json({gametest : gametest.getGameState(), methode : req.method});

};

/*
  using username in parameter, 
  create a new game state if not exist, else join an existing one 
  then return the game state. */
exports.joinNewGame = function(req, res) {
    let username = req.params.username;
    
    console.log(activegame);

    //add security if 2 player already connected
    let game ;
    if(!activegame) activegame=new Game();

    game = activegame;
    game.players.push(new Player(username,0));
    //set game state : awaiting opponent

    res.json({game : game.getGameState(), methode : req.method});

};





/*get the current game state, 
using game id in parameter */
exports.getgame = function(req, res) {
  let gameid = req.params.gameid;
  //TODO : retrieve the game based on his id

  if(!activegame) throw 'invalidOperation, no game with this id';
  res.json({game : activegame.getGameState(), methode : req.method});
};




/*recieve a clicked edge, 
using game id, username and edge id in parameter */
exports.playTurn = function(req, res) {
  let gameid = req.params.gameid;
  let userName = req.params.username;
  let edgeId = parseInt(req.params.edgeid);//parse int

  if(!activegame) throw 'invalidOperation : the game is not initialized';
  if(activegame.gameid != gameid) throw 'invalidOperation : the game id doesent match the current game';
  //TODO : update edge in the game state

  activegame.playTurn(userName, edgeId);


  res.json({game : activegame.getGameState(), methode : req.method});

};
