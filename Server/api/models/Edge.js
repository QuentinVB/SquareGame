'use strict';


class Edge {
    constructor(state, box1,box2) {
      this.state = state; //0 neutral , 1 red, 2 blue
      this.box1 =  box1;
      this.box2 =  box2;
    }
    static EmptyEdge() {
      return new Edge();
    }
  }
module.exports = Edge;
