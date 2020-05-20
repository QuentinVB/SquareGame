'use strict';
module.exports = function(app) {
  var gamecontroller = require('../controllers/Controller');

  // todoList Routes
  app.route('/tasks')
    .get(gamecontroller.getgrid);
    //.post(gamecontroller.create_a_task);

/*
  app.route('/tasks/:taskId')
    .get(gamecontroller.read_a_task)
    .put(gamecontroller.update_a_task)
    .delete(gamecontroller.delete_a_task);*/
};
