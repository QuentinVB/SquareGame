'use strict';
import { v5 as uuidv5 } from 'uuid';


const DEFAULTGRIDSIZE = 5;

//TODO : a game state with all the stuff !

var Box = require('./Box'); //created model loading here

class Game {
    constructor(gridSize = DEFAULTGRIDSIZE) {
      this.gameid = Date.now(); //yes... timestamp as game id, who cares ?
      this.gridSize = gridSize;
      this.players = [];
      this.winner = -1;
      this.turn = 0;
      this.grid = [];
      this.createNewGrid();
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
      //add prechecks ?

      var state = 
       {
        gameid : this.gameid,
        player1: 
        {
            username: this.players[0].username,
            score: this.players[0].score
        },
        player2: 
        {
          username: this.players[1].username,
          score: this.players[1].score
        },
        winner: this.winner+1,
        turn: "player"+(this.turn+1),
        gridsize: this.gridSize,
        //now the grid...
        grid:[],
        edges:[]
      };

      var edgeIdx=0;
      var gridBox =[];
      
      var lineStartIdx=0;
      var secondRead = false;

      for (let i = 0; i < this.grid.length; i++) {
        const box = this.grid[i];
        if(!secondRead)
        {
          gridBox.push({

            state:box.state,
            up:0,
            right:0,
            bottom:0,
            left:0,
          });
        }
        
      }
/*
x = squareId % size
y = floor(squareId / size)

 

top = y * (2 * size + 1) + x
left = top + size
right = left + 1
bot = top + (2 * size + 1)

*/

      return state;
    }
  }
  
module.exports = Game;
