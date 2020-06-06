'use strict';
var Game = require('../models/Game'); //created model loading here

//TODO : should be a key/value "dictionnary" with key as GameId and Value as Games
var activegame;

//a naked game for the tests
var gametest = new Game (3);
gametest.createNewGrid();
exports.getgrid = function(req, res) {
    res.json({gametest : gametest.getGameState(), methode : req.method});

};

/*
  using username in parameter, 
  create a new game state if not exist, else join an existing one 
  then return the game state. */
exports.joinNewGame = function(req, res) {
    let username = req.param.userName;

    let game ;
    //TODO :retrieve in a game collection, if any game has 1 opponent waiting, else create a new game
    if(!activegame) activegame=new Game();
    //TODO : create correctly the game
    
    game= activegame;
    game.createNewGrid();


    res.json({game : game.getGameState(), methode : req.method});

};





/*get the current game state, 
using game id in parameter */
exports.getgame = function(req, res) {
  let gameid = req.param.gameid;
  //TODO : retrieve the game based on his id

  if(!activegame) throw 'invalidOperation, no game with this id';
  res.json({game : activegame.getGameState(), methode : req.method});
};




/*recieve a clicked edge, 
using game id, username and edge id in parameter */
exports.playTurn = function(req, res) {
  let gameid = req.param.gameid;
  let userName = req.param.userName;
  let edgeId = req.param.edgeId;

  if(!activegame) throw 'invalidOperation';

  //TODO : update edge in the game state

  res.json({game : activegame.getGameState(), methode : req.method});

};


/*
exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/