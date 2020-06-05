'use strict';
module.exports = function(app) {
  var gamecontroller = require('../controllers/Controller');

  // todoList Routes
  app.route('/grid')
    .get(gamecontroller.getgrid);
  
  app.route('/ping')
    .get((req, res)=> {
      res.json({ping : "pong", methode : req.method})}
      );
  app.route('/time')
    .get((req, res)=> {
      res.json({timestamp : Date.now(), methode : req.method})}
      );
    //.post(gamecontroller.create_a_task);

/*
  app.route('/tasks/:taskId')
    .get(gamecontroller.read_a_task)
    .put(gamecontroller.update_a_task)
    .delete(gamecontroller.delete_a_task);*/
};
