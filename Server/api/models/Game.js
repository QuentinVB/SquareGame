'use strict';

const DEFAULTGRIDSIZE = 3;

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
  //if(gridsize*gridsize != grid.length) throw "the gridsize doesnt match the grid length, should be "+gridsize*gridsize+ " but was " +grid.length;

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
      this.gameid = Date.now().toString(16); //yes... timestamp as game id in hex, who cares ?
      this.gridsize = gridsize;
      this.players = [];
      this.winner = -1;
      this.turn = 0; //
      this.grid = [];
      this.edges = [];

      //game state : awaiting opponent / player 1 turn / player 2 turn

      this.createNewGrid();
    }

    //player shortcut ?
/*
    player1()
    {
      if(this.players.length==0) throw "invalid operation, no player in this game !";
      return player
    }*/
    /*
    player1 id (and score and turn ?)
    player2 id
    turn (who's playing ?)
    grid
    playTurn method to play a turn
    
    all the method to get the game working
    */
  
    createNewGrid() {

      if(this.gridsize < 0) throw "grid size cant be negative";


      for (let i = 0; i < (this.gridsize*this.gridsize); i++) {

        var x = i % this.gridsize;
        var y = Math.floor(i / this.gridsize);

        
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

      var player1=null;
      var player2=null;
      if(this.players[0])
      {
        player1 = {
          username: this.players[0].username,
          score: this.players[0].score
        }
      }
      if(this.players[1])
      {
        player2 = {
          username: this.players[1].username,
          score: this.players[1].score
        }
      }

      var state = 
       {
        gameid : this.gameid,
        player1: player1,
        player2: player2,
        winner: this.winner+1,
        turn: "player"+(this.turn+1),
        gridsize: this.gridsize,
        grid:[],
        edges: []
      };

      for (let i = 0; i < this.edges.length; i++) {
        state.edges.push(
          {
            state:this.edges[i].state
          }
        );
      }

      for (let i = 0; i < this.grid.length; i++) {
        var edgeidx = computeEdgeIdx(this.grid,this.gridsize,i);
        state.grid.push({
            state:this.grid[i].state,
            top:edgeidx.top,
            right:edgeidx.right,
            bottom:edgeidx.bottom,
            left:edgeidx.left,
          });
        }
      return state;
    }

    playTurn(username, edgeId)
    {

      if(edgeId>this.edges.length || edgeId<0) throw "edge id is invalid, was "+edgeId;
      var playerWhoPlays =this.players[this.turn]; //player id is turn in fact, who hold the truth
      if(playerWhoPlays.username != username) throw "not your turn, you cheater !";

      //change edge
      //TODO : cant change an edge already taken !!!!
      var edgetoChange = this.edges[edgeId];
      edgetoChange.state = this.turn+1; //set the state based on the "player id" then offset to match

      //check if adjacent box are changed and change them, if any wins, the player can play again
      var winningBox1 = false;
      var winningBox2 = false;
      if(edgetoChange.box1)
      {
        winningBox1 = edgetoChange.box1.checkBorder(this.turn+1);
        if(winningBox1)playerWhoPlays.score++;
      }
      if(edgetoChange.box2)
      {
        winningBox2 = edgetoChange.box2.checkBorder(this.turn+1);
        if(winningBox2)playerWhoPlays.score++;
      }
      //change turn
      if(!winningBox1 && !winningBox1) this.turn = this.turn==0?1:0;

      //check for victory
      if(this.players[0].score +this.players[1].score === this.gridsize*this.gridsize)
      {
        this.winner = this.turn;
        //game over !
      }
    }


  }
  
module.exports = Game;
