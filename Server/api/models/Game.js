'use strict';


const DEFAULTGRIDSIZE = 3;

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

function computeEdgeIdx(grid,gridsize,idx)//return an object with the theorical edges idx for a given box idx
{
  //if(grid.length==gridsize*gridsize) throw "grid is not complete";
  if(idx<0 || idx > grid.length) throw "index out of range";
  if(gridsize<0) throw "the grid size cant be negative";
  if(gridsize*gridsize == grid.length) throw "the gridsize doesnt match the grid length";

  var x = idx % gridsize;
  var y = Math.floor(idx / gridsize);

  var top = y * (2 * gridsize + 1) + x;
  var left = top + gridsize;
  var right = left + 1;
  var bottom = top + (2 * gridsize + 1);

  return {idx, top,left,right,bottom}
}
/*
function getEdge(grid,gridsize,idx)//return the edge in the grid that match the idx
{
  if(grid.length==0) throw "grid is empty";
  if(grid.length==gridsize*gridsize) throw "grid is not complete";
  if(idx<0 || idx > grid.length) throw "index out of range";
  if(gridsize<0) throw "the grid size cant be negative";
  if(gridsize*gridsize == grid.length) throw "the gridsize doesnt match the grid length";



}
*/

class Game {
    constructor(gridsize = DEFAULTGRIDSIZE) {
      this.gameid = Date.now(); //yes... timestamp as game id, who cares ?
      this.gridsize = gridsize;
      this.players = [];
      this.winner = -1;
      this.turn = 0;
      this.grid = [];
      this.edges = [];


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
          var edgeidx = computeEdgeIdx(this.grid,this.gridsize,i);

          box.top = new Edge(edgeidx.top,0,box);
          box.left = new Edge(edgeidx.left,0,box);
          box.bottom = new Edge(edgeidx.bottom,0,box);
          box.right = new Edge(edgeidx.right,0,box);

          this.edges.push(...[box.top,box.left,box.bottom,box.right]);

          this.grid.push(box);
        }
        else if(y==0) 
        {
          //first row
          var box = new Box(i,x,y);
          var edgeidx = computeEdgeIdx(this.grid,this.gridsize,i);

          box.top = new Edge(edgeidx.top,0,box);
          box.bottom = new Edge(edgeidx.bottom,0,box);
          box.right = new Edge(edgeidx.right,0,box);

          this.edges.push(...[box.top,box.bottom,box.right]);


          var edgeLeft = GetBox("left",this.grid,this.gridsize,i).right;
          if(!edgeLeft) throw "there is no edge here at the left !";
          if(edgeLeft.idx != edgeidx.left) throw "edges id doesnt match !";
          edgeLeft.box2 = box;
          box.left = edgeLeft;
          this.grid.push(box);
        }
        else if(x==0)
        {
          //first column
          var box = new Box(i,x,y);
          var edgeidx = computeEdgeIdx(this.grid,this.gridsize,i);

          box.left = new Edge(edgeidx.left,0,box);
          box.bottom = new Edge(edgeidx.bottom,0,box);
          box.right = new Edge(edgeidx.right,0,box);

          this.edges.push(...[box.left,box.bottom,box.right]);


          var edgeTop = GetBox("top",this.grid,this.gridsize,i).bottom;
          if(!edgeTop) throw "there is no edge here at the top !";
          if(edgeTop.idx != edgeidx.top) throw "edges id doesnt match !";
          edgeTop.box2 = box;
          box.top = edgeTop;
          this.grid.push(box);
        }
        else 
        {
          //other cell
          var box = new Box(i,x,y);
          var edgeidx = computeEdgeIdx(this.grid,this.gridsize,i);

          box.bottom = new Edge(edgeidx.bottom,0,box);
          box.right = new Edge(edgeidx.right,0,box);
          this.edges.push(...[box.bottom,box.right]);

          var edgeTop = GetBox("top",this.grid,this.gridsize,i).bottom;
          if(!edgeTop) throw "there is no edge at the top !";
          if(edgeTop.idx != edgeidx.top) throw "edges id doesnt match !";
          edgeTop.box2 = box;
          box.top = edgeTop;

          var edgeLeft = GetBox("left",this.grid,this.gridsize,i).right;
          if(!edgeLeft) throw "there is no edge at the left !";
          if(edgeLeft.idx != edgeidx.left) throw "edges id doesnt match !";
          edgeLeft.box2 = box;
          box.left = edgeLeft;

          this.grid.push(box);
        }

      }

      var edgeCount = ((2*(this.gridsize+1)*(this.gridsize+1) ) -(2*(this.gridsize+1)));
      //cf : https://cs.stackexchange.com/questions/62847/draw-a-5-×-5-grid-graph-how-many-edges-does-the-n-×-n-grid-graph-have
      //a 3*3 edges graphs is a 4*4 nodes graph
      if(this.edges.length!=edgeCount) throw "edge count doesnt matcht, edge array length is "+this.edges.length+" should be "+edgeCount;
      if(this.grid.length!= (this.gridsize*this.gridsize)) throw "not enough box in the grid ! grid length is "+this.grid.length+" should be "+(this.gridsize*this.gridsize) ;

      //sort edges
      this.edges.sort((a, b) => a.idx - b.idx);
      
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
