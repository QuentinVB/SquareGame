'use strict';

const DEFAULTGRIDSIZE = 5;

//TODO : a game state with all the stuff !

var Box = require('./Box'); //created model loading here

class Game {
    constructor(gridSize = DEFAULTGRIDSIZE) {
      this.gridSize = gridSize;
      this.players = [];
      this.winner = -1;
      this.turn = 0;
      this.grid = [];
      createNewGrid();
    }
    /*
    player1 id (and score and turn ?)
    player2 id
    turn (who's playing ?)
    grid
    playTurn method to play a turn
    
    all the method to get the game working
    */
  
    createNewGrid() {
      this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(Box.EmptyBox()));

      //TODO : create edges into another array 

      return this.grid;
    }

    getGameState() {
      return {
        gridsize: this.gridSize,
        grid: this.grid
      }
    }
  }
  
module.exports = Game;
