'use strict';

//TODO : a game state with all the stuff !

var Square = require('./Square'); //created model loading here

class Game {
    constructor(gridSize) {
      this.gridSize = gridSize;
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
      this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(Square.EmptySquare()));

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
