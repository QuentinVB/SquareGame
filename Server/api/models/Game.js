'use strict';


const DEFAULTGRIDSIZE = 5;

//TODO : a game state with all the stuff !

var Box = require('./Box'); //created model loading here
var Edge = require('./Edge'); //created model loading here

function GetBox(position,grid,gridsize,idx) //return : box at the position in the grid from the box idx
{

  if(grid.length==0) throw "grid is empty";
  if(idx<0 || idx > grid.length) throw "index out of range";
  if(gridsize<0) throw "the grid size cant be negative";
  if(gridsize*gridsize == grid.length) throw "the gridsize doesnt match the grid length";
  //TODO : check position is in "top", "right", "bottom", "left"

  var x = idx % gridsize;
  var y = Math.floor(idx / gridsize);
/*
  var top = y * (2 * gridsize + 1) + x;
  var left = top + gridsize;
  var right = left + 1;
  var bottom = top + (2 * gridsize + 1);
  */

  var top = idx - gridsize;
  if(top<0) top = undefined;

  var left = idx-1 ;
  if(x==0) left = undefined;

  var right = idx+1 ;
  if(x>gridsize) right = undefined;

  var bottom = idx+ gridsize ;
  if(bottom>gridsize*gridsize) bottom= undefined;

  switch (position) {
    case "top": return (top===undefined)?undefined:grid[top];
    case "right": return (right===undefined)?undefined:grid[right];
    case "bottom": return (bottom===undefined)?undefined:grid[bottom];
    case "left": return (left===undefined)?undefined:grid[left];
    default: return undefined
  }
}


class Game {
    constructor(gridsize = DEFAULTGRIDSIZE) {
      this.gameid = Date.now(); //yes... timestamp as game id, who cares ?
      this.gridsize = gridsize;
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
      console.log(this);

      if(this.gridsize < 0) throw "grid size cant be negative";

      console.log("test "+this.gridsize);

      for (let i = 0; i < (this.gridsize*this.gridsize); i++) {

        var x = i % this.gridsize;
        var y = Math.floor(i / this.gridsize);

        console.log(x,y);
        
        if(x==0 && y==0)
        {
          //first cell
          var box = new Box(i,x,y);
          box.top = new Edge(0,box);
          box.left = new Edge(0,box);
          box.bottom = new Edge(0,box);
          box.right = new Edge(0,box);
          this.grid.push(box);
        }
        else if(y==0) 
        {
          //first row
          var box = new Box(i,x,y);
          box.top = new Edge(0,box);
          
          box.bottom = new Edge(0,box);
          box.right = new Edge(0,box);

          var edge = GetBox("left",this.grid,this.gridsize,i).right;
          if(!edge) throw "there is no edge here at the left !";
          edge.box2 = box;
          box.left = edge;
          this.grid.push(box);
        }
        else if(x==0)
        {
          //first column
          var box = new Box(i,x,y);

          box.left = new Edge(0,box);
          box.bottom = new Edge(0,box);
          box.right = new Edge(0,box);

          var edge = GetBox("top",this.grid,this.gridsize,i).bottom;
          if(!edge) throw "there is no edge here at the top !";

          edge.box2 = box;
          box.top = edge;
          this.grid.push(box);
        }
        else 
        {
          //other cell
          var box = new Box(i,x,y);

          box.bottom = new Edge(0,box);
          box.right = new Edge(0,box);

          var edgeTop = GetBox("top",this.grid,this.gridsize,i).bottom;
          if(!edgeTop) throw "there is no edge at the top !";
          edgeTop.box2 = box;
          box.top = edgeTop;

          var edgeLeft = GetBox("left",this.grid,this.gridsize,i).right;
          if(!edgeLeft) throw "there is no edge at the left !";
          edgeLeft.box2 = box;
          box.left = edgeLeft;

          this.grid.push(box);
        }

      }

      if(this.grid.length!= (this.gridsize*this.gridsize)) throw "not enough box in the grid ! grid length is "+this.grid.length+" should be "+(this.gridsize*this.gridsize) ;
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
