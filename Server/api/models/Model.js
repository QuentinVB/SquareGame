'use strict';

var Square = require('./Square'); //created model loading here


class GameState {
    constructor(gridSize) {
      this.gridSize = gridSize;
    }
  
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
  
module.exports = GameState;
