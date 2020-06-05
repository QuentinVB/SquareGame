'use strict';


class Edge {
    constructor(state) {
      this.state = state; //0 neutral , 1 red, 2 blue
    }
    static EmptyEdge() {
      return new Edge();
    }
  }
module.exports = Edge;
